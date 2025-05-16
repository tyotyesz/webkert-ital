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
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  adminForm!: FormGroup;
  products: any[] = [];
  pagedProducts: any[] = [];
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  constructor(
    private termekekService: TermekekService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.inic();
    this.loadProducts();
  }

  inic(){
    this.adminForm = this.formBuilder.group({
      termeknev:['', Validators.required],
      termekara:['', Validators.required],
      kategoria:['', Validators.required],
    });
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

  adminAdd(): void{
    if(this.adminForm.valid){
      const{termeknev, termekara, kategoria} = this.adminForm.value; 
    }
  }
  async termekTorles(termekId: string): Promise<void>{
    try{
      await this.termekekService.deleteProduct(termekId);
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
