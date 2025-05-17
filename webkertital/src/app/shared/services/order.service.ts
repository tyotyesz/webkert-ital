import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, arrayUnion, doc, getDoc, deleteDoc, Timestamp, getDocs, query, orderBy } from '@angular/fire/firestore';
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

async loadOrders(): Promise<any[]> {
  const user = await this.authService.getUserData();
  if (!user) {
    return [];
  }

  // Query all orders, ordered by ido ascending
  const ordersCollection = collection(this.firestore, 'Orders');
  const q = query(ordersCollection, orderBy('ido', 'desc'));
  const querySnapshot = await getDocs(q);

  // Filter only orders belonging to the current user
  const userOrderIds = user.orders || [];
  const orders: any[] = [];

  for (const docSnap of querySnapshot.docs) {
    if (userOrderIds.includes(docSnap.id)) {
      const orderData = docSnap.data();
      let sum = 0;
      for (const orderItemId of orderData['items']) {
        const orderItemDoc = await getDoc(doc(this.firestore, 'OrderItem', orderItemId));
        if (orderItemDoc.exists()) {
          const orderItem = orderItemDoc.data();
          const productDoc = await getDoc(doc(this.firestore, 'Termekek', orderItem['termekid']));
          const product = productDoc.exists() ? productDoc.data() : {};
          sum += (product['termekara'] || 0) * (orderItem['mennyiseg'] || 0);
        }
      }
      const tax = sum * 0.27;
      const totalWithTax = sum + tax;
      orders.push({ id: docSnap.id, ...orderData, sum: totalWithTax });
    }
  }
  console.log('Orders:', orders);
  return orders;
}

  async getOrderById(orderId: string): Promise<any> {
    const orderDocRef = doc(this.firestore, 'Orders', orderId);
    const orderSnap = await getDoc(orderDocRef);
    return orderSnap.exists() ? orderSnap.data() : null;
  }

  async deleteOrderById(orderId: string): Promise<void> {
    const orderDocRef = doc(this.firestore, 'Orders', orderId);
    await deleteDoc(orderDocRef);
  }

  async deleteOrderItemById(orderItemId: string): Promise<void> {
    const itemDocRef = doc(this.firestore, 'OrderItem', orderItemId);
    await deleteDoc(itemDocRef);
  }

  async getOrderItemById(orderItemId: string): Promise<any> {
    const itemDocRef = doc(this.firestore, 'OrderItem', orderItemId);
    const itemSnap = await getDoc(itemDocRef);
    return itemSnap.exists() ? { id: itemSnap.id, ...itemSnap.data()} : null;
  }

  async getAllOrders(): Promise<any[]> {
    const ordersSnap = await getDocs(collection(this.firestore, 'Orders'));
    return ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateOrderItems(orderId: string, itemsToKeep: string[]): Promise<void> {
    const orderDocRef = doc(this.firestore, 'Orders', orderId);
    await updateDoc(orderDocRef, { items: itemsToKeep });
  }
}
