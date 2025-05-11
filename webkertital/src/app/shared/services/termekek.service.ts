import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TermekekService {

  constructor(private firestore: Firestore) { }

  async getAllProducts(): Promise<any[]> {
    try{
      const termekekCollection = collection(this.firestore, "Termekek");
      const querySnapshot = await getDocs(termekekCollection);
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    
  }

  async getRandomProducts(): Promise<any[]> {
    try{
      const termekekCollection = collection(this.firestore, "Termekek");
      const querySnapshot = await getDocs(termekekCollection);
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const shuffledProducts = products.sort(() => Math.random() - 0.5);



      return shuffledProducts.slice(0, 5);
    } catch (error) {
      console.error("Error fetching random products:", error);
      throw error;
    }
    
  }

  async getProductsByCategory(category: string): Promise<any[]> {
    try{
      const termekekCollection = collection(this.firestore, "Termekek");
      const q = query(termekekCollection, where("kategoria", "==", category));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      return products;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  }
}
