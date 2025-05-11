import { Component, OnInit, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Termek} from '../../shared/models/termekek';
import { Felhasznalo} from '../../shared/models/felhasznalok';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { MatButtonModule } from '@angular/material/button';
import { Kosar} from '../../shared/models/kosar';
import { KosarService } from '../../shared/services/kosar.service';
import { TermekekService } from '../../shared/services/termekek.service';

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
    private felhasznaloService: FelhasznaloService,
    private kosarService: KosarService,
    private termekekService: TermekekService,

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
  /*addToCart(termekId: number): void {
    const userId = this.felhasznaloService.getUserId();
  
    // Ellenőrizzük, hogy a termék már szerepel-e a kosárban
    const index = KosarObject.findIndex(item => item.productsid === termekId && item.user_id === userId);
  
    if (index !== -1) {
      // Ha már szerepel, növeljük a mennyiségét
      KosarObject[index].mennyi += 1;
      console.log(`Termék ID: ${termekId} mennyisége növelve. Új mennyiség: ${KosarObject[index].mennyi}`);
    } else {
      // Ha még nem szerepel, létrehozzuk az új terméket a kosárban
      KosarObject.push({
        id: Kosar.kosarId++,
        mennyi: 1,
        user_id: userId,
        productsid: termekId,
      });
      console.log(this.termekekService.getTermekekById(termekId));
    }

    this.termekek = KosarObject.filter(termek => termek.user_id === userId);
    console.log(this.termekek);
  
    // Frissítjük a kosár mennyiségét
    this.updateKosarMennyiseg();
  }*/
  /*updateKosarMennyiseg(): number {
    const userId = this.felhasznaloService.getUserId();
    const userKosar = KosarObject.filter(item => item.user_id === userId);
    return userKosar.reduce((osszeg, item) => osszeg + item.mennyi, 0);
  }*/
}
