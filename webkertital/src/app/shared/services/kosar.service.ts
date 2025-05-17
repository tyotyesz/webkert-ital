import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where, doc, deleteDoc, addDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  cartChanged = new BehaviorSubject<void>(undefined);

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  async addToCart(productId: string): Promise<void> {
    const user = await this.authService.getUserData();
    console.log("XDDD", user);
    if(!user) {
      throw new Error('User not logged in');
    }

    const userDocRef = doc(this.firestore, 'Users', user.id);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    // Always ensure kosar is an array
    const kosarArray: string[] = userDocSnap.exists() && userData && Array.isArray(userData['kosar']) ? userData['kosar'] : [];

    let foundKosarId: string | null = null;
    for (const kosarId of kosarArray) {
      const kosarDocRef = doc(this.firestore, 'Kosar', kosarId);
      const kosarDocSnap = await getDoc(kosarDocRef);
      const kosarData = kosarDocSnap.data();
      if (kosarDocSnap.exists() && kosarData && kosarData['productid'] === productId) {
        foundKosarId = kosarId;
        break;
      }
    }

    if (foundKosarId) {
      // Update mennyi
      const kosarDocRef = doc(this.firestore, 'Kosar', foundKosarId);
      const kosarDocSnap = await getDoc(kosarDocRef);
      const kosarData = kosarDocSnap.data();
      const currentMennyi = kosarData && kosarData['mennyi'] ? kosarData['mennyi'] : 1;
      await updateDoc(kosarDocRef, { mennyi: currentMennyi + 1 });
    } else {
      // Add new Kosar doc
      const kosarColl = collection(this.firestore, 'Kosar');
      const newKosarDoc = await addDoc(kosarColl, {
        productid: productId,
        mennyi: 1
      });
      // Add new Kosar doc ID to user's kosar array
      await updateDoc(userDocRef, {
        kosar: arrayUnion(newKosarDoc.id)
      });
    }

    this.cartChanged.next();
  }

  async removeFromCart(productId: string): Promise<void> {
    const user = await this.authService.getUserData();
    if (!user) {
      return;
    }

    const userDocRef = doc(this.firestore, 'Users', user.id);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    const kosarArray: string[] = userDocSnap.exists() && userData && Array.isArray(userData['kosar']) ? userData['kosar'] : [];

    let kosarDocId: string | null = null;
    for (const kosarId of kosarArray) {
      const kosarDocRef = doc(this.firestore, 'Kosar', kosarId);
      const kosarDocSnap = await getDoc(kosarDocRef);
      const kosarData = kosarDocSnap.data();
      if(kosarDocSnap.exists() && kosarData && kosarData['productid'] === productId) {
        kosarDocId = kosarId;
        break;
      }
    }

    if(kosarDocId) {
      await updateDoc(userDocRef, {
        kosar: arrayRemove(kosarDocId)
      });
      await deleteDoc(doc(this.firestore, 'Kosar', kosarDocId));
      this.cartChanged.next();
    }
  }


  async getCartQuantity(): Promise<number> {
  const user = await this.authService.getUserData();
  if (!user) return 0;

  const userDocRef = doc(this.firestore, 'Users', user.id);
  const userDocSnap = await getDoc(userDocRef);
  const userData = userDocSnap.data();
  const kosarArray: string[] = userDocSnap.exists() && userData && Array.isArray(userData['kosar']) ? userData['kosar'] : [];

  // Fetch all Kosar docs in parallel
  const kosarDocs = await Promise.all(
    kosarArray.map(kosarId => getDoc(doc(this.firestore, 'Kosar', kosarId)))
  );

  let total = 0;
  for (const kosarDocSnap of kosarDocs) {
    const kosarData = kosarDocSnap.data();
    if (kosarDocSnap.exists() && kosarData && typeof kosarData['mennyi'] === 'number') {
      total += kosarData['mennyi'];
    }
  }
    return total;
  }

  async getKosar(): Promise<any[]> {
    const user = await this.authService.getUserData();
    if (!user) return [];

    const userDocRef = doc(this.firestore, 'Users', user.id);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    const kosarArray: string[] = userDocSnap.exists() && userData && Array.isArray(userData['kosar']) ? userData['kosar'] : [];

    const kosarDocs = await Promise.all(
      kosarArray.map(kosarId => getDoc(doc(this.firestore, 'Kosar', kosarId)))
    );

    const result: any[] = [];
    for (const kosarDocSnap of kosarDocs) {
      const kosarData = kosarDocSnap.data();
      if (kosarDocSnap.exists() && kosarData) {
        const productId = kosarData['productid'];
        const mennyi = kosarData['mennyi'];
        const termekDocSnap = await getDoc(doc(this.firestore, 'Termekek', productId));
        const termekData = termekDocSnap.data();
        if (termekDocSnap.exists() && termekData) {
          result.push({
            id: productId,
            mennyi,
            termeknev: termekData['termeknev'],
            termekara: termekData['termekara'],
            kepeleres: termekData['kepeleres']
          });
        }
      }
    }
    console.log("SZAR", result);
    return result;
  }

  async updateKosarQuantity(productId: string, newQty: number): Promise<void> {
    const user = await this.authService.getUserData();
    if (!user) return;

    const userDocRef = doc(this.firestore, 'Users', user.id);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    const kosarArray: string[] = userDocSnap.exists() && userData && Array.isArray(userData['kosar']) ? userData['kosar'] : [];

    let kosarDocId: string | null = null;
    for (const kosarId of kosarArray) {
      const kosarDocRef = doc(this.firestore, 'Kosar', kosarId);
      const kosarDocSnap = await getDoc(kosarDocRef);
      const kosarData = kosarDocSnap.data();
      if (kosarDocSnap.exists() && kosarData && kosarData['productid'] === productId) {
        kosarDocId = kosarId;
        break;
      }
    }

    if(kosarDocId) {
      const kosarDocRef = doc(this.firestore, 'Kosar', kosarDocId);
      await updateDoc(kosarDocRef, { mennyi: newQty });
      this.cartChanged.next();
    }


  }
  
}
