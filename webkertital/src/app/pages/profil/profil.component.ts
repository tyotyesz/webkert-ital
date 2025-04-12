import { Component, OnInit } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { Felhasznalo, FelhasznalokObject } from '../../shared/models/felhasznalok';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profil',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatListModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  profilForm!: FormGroup;
  kijelentkezesForm!: FormGroup;
  EmailLetezik = false;
  UresVezeteknev = false;
  UresKeresztnev = false;
  UresTelefonszam = false;
  UresEmail = false;

  constructor(
    private felhasznaloService: FelhasznaloService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void{
    const felhasznalo = this.felhasznaloService.getFelhasznalo();
    this.profilForm = this.formBuilder.group({
      vezeteknev:[ felhasznalo?.vezeteknev || '', Validators.required],
      keresztnev:[ felhasznalo?.keresztnev || '', Validators.required],
      emailcim:[ felhasznalo?.email || '', [Validators.required, Validators.email]],
      telefonszam:[ felhasznalo?.telefonszam || '', Validators.required]
    })
    
  }

  isLoggedIn(): boolean{
    return this.felhasznaloService.isLogged();
  }

  isAdmin(): boolean{
    return this.felhasznaloService.isAdministrator();
  }

  getHirlevelsub(): boolean{
    return this.felhasznaloService.getFelhasznalo()?.hirlevelsub === 'igen';
  }
  getSzallitasiAdatok(): any | null{
    return this.felhasznaloService.getFelhasznalo()?.szallitasi_adatok;
  }
  getFizetesiAdatok(): any | null{
    return this.felhasznaloService.getFelhasznalo()?.fizetesi_adatok;
  }
  HirlevelEltavolit(): void{
    const felhasznalo = this.felhasznaloService.getFelhasznalo();
    if(felhasznalo){
      this.felhasznaloService.updateFelhasznalo({ ...felhasznalo, hirlevelsub: 'nem' });
      this.router.navigate(['/profil']);

    }
  }
  HirlevelHozzaad(): void{
    const felhasznalo = this.felhasznaloService.getFelhasznalo();
    if(felhasznalo){
      this.felhasznaloService.updateFelhasznalo({ ...felhasznalo, hirlevelsub: 'igen' });
      this.router.navigate(['/profil']);

    }
  }
  updatePassword(): void{
    this.router.navigate(['/jelszomodositas']);
  }
  SzallitasEltavolit(): void{
    const felhasznalo = this.felhasznaloService.getFelhasznalo();
    if(felhasznalo){
      this.felhasznaloService.updateFelhasznalo({ ...felhasznalo, szallitasi_adatok: '' });
      this.router.navigate(['/profil']);
    }
  }
  
  SzallitasHozzaad(): void {
    this.router.navigate(['/szallitasiadatok']);
  }

  //Következő mérföldkőben!!!
  /*
  getAdatok(): any{
    return this.felhasznaloService.getFelhasznalo();
  }*/

  //Következő mérföldkőben!!!
  updateProfile(): void {
    if(this.profilForm.valid){
      const { vezeteknev, keresztnev, emailcim, telefonszam } = this.profilForm.value;
      this.felhasznaloService.updateFelhasznalo({ vezeteknev, keresztnev, emailcim, telefonszam });
      return;
    }else{
      return;
    }
  }
  
  kijelentkezes(): void{
    localStorage.clear();
    this.router.navigate(['/fomenu']);
  }
  //Következő mérföldkőben!!!
  /*deleteAccount(): void{
    this.felhasznaloService.deleteFelhasznalo(this.felhasznaloService.getFelhasznalo()?.email || '');
    localStorage.clear();
    this.router.navigate(['/fomenu']);
    
  }*/
  
}
