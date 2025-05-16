import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, User as FirebaseUser, UserCredential, createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from '@angular/fire/auth';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Felhasznalo } from '../models/felhasznalok';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) { 
    this.currentUser = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('bejelentkezve-e', 'false');
    localStorage.setItem('admin-e', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigate(['/fomenu']).then(() => {
        window.scrollTo(0, 0);
      });
    });
  }

  async signUp(email: string, password: string, userData: Partial<Felhasznalo>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        kosar: [],
        orders: []
      });
      return userCredential;
    } catch (error) {
      console.error("Hiba a regisztráció során:", error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<Felhasznalo>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);

    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('bejelentkezve-e', isLoggedIn ? 'true' : 'false');
  }

  async getAdminStatus(userId: string): Promise<boolean> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if(userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return userData['admin'] || false;
      } else{
        console.error("No such user document!");
        return false;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  }
  async reauthenticateUser(password: string): Promise<void> {
    const user = this.auth.currentUser;
    if(!user || !user.email) {
      console.error("No user is currently signed in.");
      throw new Error("No user is currently signed in.");
    }

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential)

  }

  async updatePassword(newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if(!user) {
      throw new Error("User is not signed in.");
    }

    await updatePassword(user, newPassword);
  }

  async deleteAccount(password: string): Promise<void> {
    const user = this.auth.currentUser;
    if(user) {
      try{
        const credential = await EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);


        const userDocRef = doc(this.firestore, 'Users', user.uid);
        await deleteDoc(userDocRef);

        await user.delete();

        console.log("Account deleted successfully");
      }catch (error) {
        console.error("Error deleting account:", error);
        throw error;
      }
      

    }else {
      console.error("No user is currently signed in.");
      throw new Error("No user is currently signed in.");
    }
  }

async getUserData(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(this.firestore, 'Users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          resolve(userDocSnap.data());
        } else {
          console.error("No such user document!");
          resolve(null);
        }
      } else {
        // Don't log error, just resolve null
        resolve(null);
      }
    }, reject);
  });
}
  onAuthStateChanged(callback: (user: any) => void): void {
    this.auth.onAuthStateChanged(callback);
  }

  async updateUserData(updatedData: Partial<Felhasznalo>): Promise<void> {
    const user = this.auth.currentUser;
    if(user) {
      const userDocRef = doc(this.firestore, 'Users', user.uid);
      await updateDoc(userDocRef, updatedData);
      console.log("User data updated successfully");
    } else {
      console.error("No user is currently signed in.");
      throw new Error("No user is currently signed in.");
    }
  }

}
