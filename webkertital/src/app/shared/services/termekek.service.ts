import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where, doc, deleteDoc, addDoc, getDoc, orderBy, limit, updateDoc } from '@angular/fire/firestore';


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
  async updateProduct(id: string, data: any): Promise<void> {
    const productDoc = doc(this.firestore, "Termekek", id);
    await updateDoc(productDoc, data);
  }
  async getCheapestProducts(): Promise<any[]> {
    const termekekCollection = collection(this.firestore, "Termekek");
    const q = query(termekekCollection, orderBy("termekara", "asc"), limit(5));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    return products;
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
  async getUditok(): Promise<any[]> {
    try{
      const termekekCollection = collection(this.firestore, "Termekek");
      const q = query(termekekCollection, where("kategoria", "==", "uditok"));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      return products;
    } catch (error) {
      console.error("Error fetching uditok products:", error);
      throw error;
    }
  }
  async deleteProduct(productId: string): Promise<void> {
    try{
      const productDocRef = doc(this.firestore, "Termekek", productId);
      await deleteDoc(productDocRef);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  async addProduct(product: any): Promise<void> {
    try{
      const termekekCollection = collection(this.firestore, "Termekek");
      await addDoc(termekekCollection, product);
      console.log("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }
  async getProductById(productId: string): Promise<any> {
    const productDocRef = doc(this.firestore, "Termekek", productId);
    const productSnap = await getDoc(productDocRef);
    return productSnap.exists() ? { id: productSnap.id, ...productSnap.data() } : null;
  }
}
