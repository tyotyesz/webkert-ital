import { Component, OnInit, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Termek} from '../../shared/models/termekek';
import { Felhasznalo} from '../../shared/models/felhasznalok';
import { MatButtonModule } from '@angular/material/button';
import { Kosar} from '../../shared/models/kosar';
import { KosarService } from '../../shared/services/kosar.service';
import { TermekekService } from '../../shared/services/termekek.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-fomenu',
  imports: [
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './fomenu.component.html',
  styleUrl: './fomenu.component.scss'
})
export class FomenuComponent implements OnInit{
  termekek: any[] = [];

  constructor(
    private kosarService: KosarService,
    private termekekService: TermekekService,
    public appcomponent: AppComponent

  ) { }

  ngOnInit(): void {
    this.termekekService.getRandomProducts()
     .then(products => {
        this.termekek = products;
        console.log(this.termekek);
     })
     .catch(error => {
        console.error('Hiba a termékek betöltésekor:', error);
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
