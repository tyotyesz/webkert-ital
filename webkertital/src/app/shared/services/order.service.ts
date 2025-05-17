import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, arrayUnion, doc, getDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { KosarService } from './kosar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private kosarService: KosarService
  ) { }

async createOrderFromCart(): Promise<void> {
  const user = await this.authService.getUserData();
  if(!user) {
    throw new Error('User not logged in');
  }

  const szallitasi_adatok = user.szallitasi_adatok;
  const userDocRef = doc(this.firestore, 'Users', user.id);
  const userDocSnap = await getDoc(userDocRef);
  const userData = userDocSnap.data();
  const kosarArray: string[] = userDocSnap.exists() && userData && Array.isArray(userData['kosar']) ? userData['kosar'] : [];

  const orderItemIds: string[] = [];
  for (const kosarId of kosarArray) {
    const kosarDocSnap = await getDoc(doc(this.firestore, 'Kosar', kosarId));
    const kosarData = kosarDocSnap.data();
    if (kosarDocSnap.exists() && kosarData && kosarData['productid']) {
      // Create OrderItem document
      const orderItemColl = collection(this.firestore, 'OrderItem');
      const orderItemDoc = await addDoc(orderItemColl, {
        termekid: kosarData['productid'],
        mennyiseg: kosarData['mennyi']
      });
      orderItemIds.push(orderItemDoc.id);
    }
  }

  const orderColl = collection(this.firestore, 'Orders');
  const orderDoc = await addDoc(orderColl, {
    szallitasi_adatok,
    items: orderItemIds,
    ido: Timestamp.now()
  });

  await updateDoc(userDocRef, {
    orders: arrayUnion(orderDoc.id)
  });

  for (const kosarId of kosarArray) {
    await deleteDoc(doc(this.firestore, 'Kosar', kosarId));
  }

  await updateDoc(userDocRef, {
    kosar: []
  });

  this.kosarService.cartChanged.next();
}
}
