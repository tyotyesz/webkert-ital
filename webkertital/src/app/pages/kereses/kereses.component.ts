import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { TermekekService } from '../../shared/services/termekek.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KosarService } from '../../shared/services/kosar.service';
import { AppComponent } from '../../app.component';
import { HufcurrencyPipe } from '../../shared/pipes/hufcurrency.pipe';

@Component({
  selector: 'app-kereses',
  imports: [
    MatListModule,
    CommonModule,
    MatIconModule,
    HufcurrencyPipe
  ],
  templateUrl: './kereses.component.html',
  styleUrl: './kereses.component.scss'
})
export class KeresesComponent implements OnInit{
  query: string = '';
  results: any[] = [];

  constructor(private termekekService: TermekekService, private route: ActivatedRoute, private kosarService: KosarService, private appcomponent: AppComponent)
 {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';

      this.searchProducts(this.query);
    })
  }

  searchProducts(query: string): void {
  this.termekekService.getAllProducts()
    .then(products => {
      const queryLower = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normalize and remove accents

      const filteredProducts = products.filter(product => {
        const productCategory = product.kategoria
          ? product.kategoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Normalize and remove accents
          : ''; // Check if 'kategoria' exists

        const productName = product.termeknev
          ? product.termeknev.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Normalize and remove accents
          : ''; // Check if 'termeknev' exists

        // Match either category or product name
        return productCategory.includes(queryLower) || productName.includes(queryLower);
      });

      console.log(`Filtered products for query "${query}":`, filteredProducts);
      this.results = filteredProducts; // Store the filtered products in the results array
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
