import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KosarService } from '../../shared/services/kosar.service';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { TermekekService } from '../../shared/services/termekek.service';
import { MatCardImage } from '@angular/material/card';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-kosar',
  imports: [
    MatListModule,
    RouterLink,
    MatCardImage,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './kosar.component.html',
  styleUrl: './kosar.component.scss'
})
export class KosarComponent implements OnInit {
  kosarForm!: FormGroup
  termekek: any[] = [];
  teljesosszeg: number = 0;
  mennyiseg = 0;
  loading = false;
  checkoutLoading = false;
  checkoutDone = false;

  constructor(
    private kosarService: KosarService,
    private termekekService: TermekekService,
    private formBuilder: FormBuilder,
    private orderService: OrderService
    
  ){}

  ngOnInit(): void{
    this.gettingAllKosar();
    
  }

  async gettingAllKosar(){
    this.loading = true;
    this.termekek = await this.kosarService.getKosar();
    this.updateMennyiseg();
    this.loading = false;
  }
  isLoggedIn(): boolean{
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }
  getTeljesOsszeg(): number{
    return this.termekek.reduce((osszeg, item) => {
      return osszeg + (item.termekara * item.mennyi);
    }, 0);
  }

  getAfa(): number{
    return this.getTeljesOsszeg() * 0.27;
  }

  getVegosszeg(): number{
    return this.getTeljesOsszeg() + this.getAfa();
  }
  updateMennyiseg() {
    this.mennyiseg = this.termekek.reduce((sum, item) => sum + Number(item.mennyi), 0);
  }

  isKosarUres(): boolean {
    return this.termekek.every(item => item.mennyi === 0) || this.termekek.length === 0;
  }
  async onQuantityChange(item: any) {
    const newQty = Number(item.mennyi);
    if(newQty < 1) {
      this.termekek = this.termekek.filter(i => i.id !== item.id);
      this.kosarService.removeFromCart(item.id);
    } else {
      const found = this.termekek.find(i => i.id === item.id);
      if (found) {
        found.mennyi = newQty;
      }
      this.kosarService.updateKosarQuantity(item.id, newQty);
    }
    this.updateMennyiseg();
  }

  async onDelete(productId: string) {
    this.termekek = this.termekek.filter(t => t.id !== productId);
    this.kosarService.removeFromCart(productId);
    this.updateMennyiseg();
  }
  async onCheckout() {
    this.checkoutLoading = true;
    try {
      await this.orderService.createOrderFromCart();
      await this.gettingAllKosar();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
    this.checkoutLoading = false;
    this.checkoutDone = true;
  }
}
