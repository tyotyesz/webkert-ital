import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TermekekService } from '../../shared/services/termekek.service';
import { KosarService } from '../../shared/services/kosar.service';
import { AppComponent } from '../../app.component';
import { HufcurrencyPipe } from '../../shared/pipes/hufcurrency.pipe';

@Component({
  selector: 'app-uditok',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HufcurrencyPipe
  ],
  templateUrl: './uditok.component.html',
  styleUrl: './uditok.component.scss'
})
export class UditokComponent implements OnInit{
  uditoTermekek: any[] = [];
  constructor(
    private termekekService: TermekekService,
    private kosarService: KosarService,
    private appcomponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.termekekService.getProductsByCategory('uditok')
      .then(products => {
        this.uditoTermekek = products;
        console.log(this.uditoTermekek);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }
  addToCart(product: any): void {
    this.appcomponent.kosarMennyiseg += 1;
    this.kosarService.addToCart(product.id)
      .then(() => {
        console.log('Termék hozzáadva a kosárhoz:', product);
      })
      .catch(error => {
        this.appcomponent.kosarMennyiseg -= 1;
        console.error('Hiba a termék kosárhoz adásakor:', error);
      });
  }
}
