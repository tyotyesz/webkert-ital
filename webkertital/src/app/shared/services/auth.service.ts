import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, User as FirebaseUser, UserCredential, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
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
}
