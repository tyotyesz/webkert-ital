import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { MatListItem } from '@angular/material/list';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { TermekekService } from '../../shared/services/termekek.service';
import { HufcurrencyPipe } from '../../shared/pipes/hufcurrency.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';
import { AppComponent } from '../../app.component';
import { KosarService } from '../../shared/services/kosar.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-admin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatPaginatorModule,
    CommonModule,
    HufcurrencyPipe
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  adminForm!: FormGroup;
  adminUpdateForm!: FormGroup;
  products: any[] = [];
  pagedProducts: any[] = [];
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  selectedImageFile: File | null = null;
  showEditProduct = false;
  editProductId: string | null = null;
  constructor(
    private termekekService: TermekekService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private appcomponent: AppComponent,
    private kosarService: KosarService,
  ) {}

  ngOnInit(): void{
    this.inic();
    this.inic2();
    this.loadProducts();
  }

  inic(){
    this.adminForm = this.formBuilder.group({
      termeknev:['', Validators.required],
      termekara:['', Validators.required],
      kategoria:['', Validators.required],
    });
  }
  inic2(){
    this.adminUpdateForm = this.formBuilder.group({
      termeknev:['', Validators.required],
      termekara:['', Validators.required],
      kategoria:['', Validators.required],
    });
  }

  onImageSelected(event: any): void {
    this.selectedImageFile = event.target.files[0] || null;
  }
  toggleEditProduct(){
    this.showEditProduct = !this.showEditProduct;
  }

  editProduct(termekId: string) {
    this.editProductId = termekId;
    const termek = this.pagedProducts.find(p => p.id === termekId);
    if (termek) {
      this.adminUpdateForm.patchValue({
        termeknev: termek.termeknev,
        termekara: termek.termekara,
        kategoria: termek.kategoria
      });
    }
  }

  async adminAdd() {
    if(this.adminForm.invalid || !this.selectedImageFile) {
      return;
    }

    const filePath = `termekek/${Date.now()}_${this.selectedImageFile.name}`;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, this.selectedImageFile);
    const downloadURL = await getDownloadURL(storageRef);

    const { termeknev, termekara, kategoria } = this.adminForm.value;
    const newProduct = {
      termeknev,
      termekara,
      kategoria,
      kepeleres: downloadURL
    }

    await this.termekekService.addProduct(newProduct)

    this.adminForm.reset();
    this.selectedImageFile = null;

    await this.loadProducts();
    

  }
  async updateAdmin() {
    if (!this.editProductId || this.adminUpdateForm.invalid) return;

    let downloadURL: string | undefined;
    if(this.selectedImageFile) {
      const filePath = `termekek/${Date.now()}_${this.selectedImageFile.name}`;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, this.selectedImageFile);
      downloadURL = await getDownloadURL(storageRef);
    }







    const updatedData = {
      termeknev: this.adminUpdateForm.value.termeknev,
      termekara: Number(this.adminUpdateForm.value.termekara),
      kategoria: this.adminUpdateForm.value.kategoria,
      kepeleres: downloadURL
    };
  

    await this.termekekService.updateProduct(this.editProductId, updatedData);
    this.showEditProduct = false;
    this.editProductId = null;
    this.adminUpdateForm.reset();
    this.selectedImageFile = null;
    this.loadProducts(); // Refresh product list
  }


  async loadProducts() {
    try {
      this.products = await this.termekekService.getAllProducts();
      this.updatePagedProducts();
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  updatePagedProducts(){
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedProducts();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('admin-e') === 'true';
  }

async termekTorles(termekId: string): Promise<void> {
  try {
    await this.termekekService.deleteProduct(termekId);

    const users = await this.authService.getAllUsers();
    for (const user of users) {
      if (user.kosar && Array.isArray(user.kosar)) {
        let deletedCount = 0;
        const newKosar: string[] = [];
        for (const kosarId of user.kosar) {
          const kosasrData = await this.kosarService.getKosarById(kosarId);
          if (kosasrData) {
            if (kosasrData.productid === termekId) {
              deletedCount += kosasrData.mennyi || 1;
              // Delete the kosar doc for this product
              await this.kosarService.deleteKosarById(kosarId);
            } else {
              newKosar.push(kosarId);
            }
          }
        }
        if (newKosar.length !== user.kosar.length) {
          await this.authService.updateUserKosar(user.id, newKosar);
          // Update badge for current user
          const currentUserId = this.authService.getUserId ? this.authService.getUserId() : localStorage.getItem('userId');
          if (user.id === currentUserId && deletedCount > 0) {
            this.kosarService.cartChanged.next();
          }
        }
      }
    }

    // Orders logic remains the same
    const orders = await this.orderService.getAllOrders();
    for (const order of orders) {
      if (order.items && Array.isArray(order.items)) {
        let itemsToKeep: string[] = [];
        for (const itemId of order.items) {
          const orderItem = await this.orderService.getOrderItemById(itemId);
          if (orderItem && orderItem.termekid !== termekId) {
            itemsToKeep.push(itemId);
          } else if (orderItem) {
            await this.orderService.deleteOrderItemById(itemId);
          }
        }
        if (itemsToKeep.length === 0) {
          await this.orderService.deleteOrderById(order.id);
        } else if (itemsToKeep.length !== order.items.length) {
          await this.orderService.updateOrderItems(order.id, itemsToKeep);
        }
      }
    }

    await this.loadProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
  getKategoriaLabel(kategoria: string): string {
  switch (kategoria) {
    case 'uditok': return 'Üdítők';
    case 'alkoholos': return 'Alkoholos';
    case 'kulonleges': return 'Különleges';
    default: return kategoria;
  }
}
}
