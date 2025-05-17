import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TermekekService } from '../../shared/services/termekek.service';
import { KosarService } from '../../shared/services/kosar.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-kulonleges',
  imports: [[MatCardModule, MatIconModule, MatButtonModule, CommonModule]],
  templateUrl: './kulonleges.component.html',
  styleUrl: './kulonleges.component.scss'
})
export class KulonlegesComponent implements OnInit {
  kulonlegesTermekek: any[] = [];
  constructor(
    private termekekService: TermekekService,
    private kosarService: KosarService,
    private appcomponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.termekekService.getProductsByCategory('kulonleges')
      .then(products => {
        this.kulonlegesTermekek = products;
        console.log(this.kulonlegesTermekek);
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
