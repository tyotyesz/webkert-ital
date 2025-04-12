import { Component } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { KosarMennyisegObject } from '../../shared/models/kosarmennyiseg';
import { KosarService } from '../../shared/services/kosar.service';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { TermekekService } from '../../shared/services/termekek.service';
import { KosarObject } from '../../shared/models/kosar';
import { MatCardImage } from '@angular/material/card';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kosar',
  imports: [
    MatListModule,
    RouterLink,
    MatCardImage,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './kosar.component.html',
  styleUrl: './kosar.component.scss'
})
export class KosarComponent {
  kosarForm!: FormGroup
  termekek: any[] = [];
  mennyitermek: any[] = [];
  teljesosszeg: number = 0;

  constructor(
    private felhasznaloService: FelhasznaloService,
    private kosarService: KosarService,
    private termekekService: TermekekService,
    private formBuilder: FormBuilder
    
  ){}

  ngOnInit(): void{
    this.termekek = KosarObject.filter(termek => termek.user_id === this.felhasznaloService.getUserId());
    console.log(this.termekek);
    this.mennyitermek = KosarMennyisegObject.filter(mennyi => mennyi.user_id === this.felhasznaloService.getUserId());
    console.log(this.mennyitermek);
    this.updateKosarMennyiseg();
    
  }


  isLoggedIn(): boolean{
    return this.felhasznaloService.isLogged();
  }
  getTermekId(id: number): any{
    const termek = this.termekekService.getTermekekById(id);
    console.log(termek);
    if (!termek) {
      console.error(`Termék ID: ${id} nem található.`);
      return null;
    }
    return termek;
  }
  getTeljesOsszeg(): number{
    return this.termekek.reduce((osszeg, item) => {
      const termek = this.getTermekId(item.id);
      if (termek) {
        return osszeg + (termek.termekara * item.mennyi);
      } else {
        console.warn(`Termék ID: ${item.id} nem található, ezért kimarad az összegből.`);
        return osszeg;
      }
    }, 0);
  }

  getAfa(): number{
    return this.getTeljesOsszeg() * 0.27;
  }

  getVegosszeg(): number{
    return this.getTeljesOsszeg() + this.getAfa();
  }

  onDelete(id: number){
    const index = KosarObject.findIndex(termek => termek.id === id && termek.user_id === this.felhasznaloService.getUserId());
    if(index !== -1){
      KosarObject.splice(index, 1);
      console.log("Termék ID: "+id+" törölve a kosárból.");
    }else{
      console.log("Nem található a termék a kosárban.");
    }

    this.termekek = KosarObject.filter(termek => termek.user_id === this.felhasznaloService.getUserId());

    this.updateKosarMennyiseg();
  }
  updateKosarMennyiseg(): number{
    const userId = this.felhasznaloService.getUserId();
    const userKosar = KosarObject.filter(termek => termek.user_id === userId);
    return userKosar.reduce((osszeg, item) => osszeg + item.mennyi, 0);
  }

  updateKosar(id: number, ujMennyiseg: number){
    const index = KosarObject.findIndex(termek => termek.id === id && termek.user_id === this.felhasznaloService.getUserId());

    if(index !== -1){
      if(ujMennyiseg > 0){
        KosarObject[index].mennyi = ujMennyiseg;
        console.log("Termék ID: "+id+" mennyisége frissítve: "+ujMennyiseg);
      }
      else{
        KosarObject.splice(index, 1);
        console.log("Termék ID: "+id+" törölve a kosárból, mert a mennyiség 0 vagy negatív érték.");
        
      }
      
    } else{
      console.error("Termék ID: "+id+" nem található a kosárban.");
    }

    this.termekek = KosarObject.filter(termek => termek.user_id === this.felhasznaloService.getUserId());
    this.updateKosarMennyiseg();
  }

  isKosarUres(): boolean {
    return this.termekek.every(item => item.mennyi === 0) || this.termekek.length === 0;
  }
}
