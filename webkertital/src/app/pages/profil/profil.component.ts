import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { CommonModule } from '@angular/common';
import { Felhasznalo} from '../../shared/models/felhasznalok';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../shared/services/auth.service';

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
    MatListModule,
    CommonModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  profilForm!: FormGroup;
  kijelentkezesForm!: FormGroup;
  EmailLetezik = false;
  UresVezeteknev = false;
  UresKeresztnev = false;
  UresTelefonszam = false;
  UresEmail = false;
  fiokTorles = false;
  jelszoFrissites = false;
  veglegesJelszo: string = '';
  oldPass: string = '';
  newPass: string = '';
  currentUserData: any = {};
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void{
    this.initializeForm();
    this.loadUserData();
  }


  initializeForm(): void {
    this.profilForm = this.formBuilder.group({
      vezeteknev:['', Validators.required],
      keresztnev:['', Validators.required],
      telefonszam:['', Validators.required]
    })
  }

  async loadUserData(): Promise<void> {
    this.currentUserData = null;
    this.authService.onAuthStateChanged((user) => {
      if(user) {
        this.authService.getUserData().then((userData) => {
          if(userData) {
            this.currentUserData = userData;
            this.profilForm.patchValue({
              vezeteknev: userData.vezeteknev,
              keresztnev: userData.keresztnev,
              telefonszam: userData.telefonszam
            });
          }
        }).catch((error) => {
          console.error('Hiba a felhasználói adatok betöltése során:', error);
        });
      } else {
        console.log('Nincs bejelentkezett felhasználó.');
        this.router.navigate(['/login']);
      }
    });
  }

  async updateProfile(): Promise<void> {
    if(this.profilForm.invalid){
      return;
    }

    const { vezeteknev, keresztnev, telefonszam, jelszoChange } = this.profilForm.value;
    if( vezeteknev === this.currentUserData.vezeteknev && 
        keresztnev === this.currentUserData.keresztnev && 
        telefonszam === this.currentUserData.telefonszam) {
      return;
    }


    try {
      await this.authService.updateUserData({ vezeteknev, keresztnev, telefonszam });
      alert('Profil sikeresen frissítve!');
      this.loadUserData();
    } catch (error) {
      console.error('Hiba a profil frissítése során:', error);
      alert('Hiba történt a profil frissítése során.');
    }
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }

  isAdmin(): boolean{
    const adminStatus = localStorage.getItem('admin-e');
    console.log('Admin status:', adminStatus); // Debugging: Log the admin status
    return adminStatus === 'true';
  }

  getHirlevelsub(): boolean{
    return this.currentUserData.hirlevelsub === 'igen';
  }
  /*getSzallitasiAdatok(): any | null{
    return this.felhasznaloService.getFelhasznalo()?.szallitasi_adatok;
  }
  getFizetesiAdatok(): any | null{
    return this.felhasznaloService.getFelhasznalo()?.fizetesi_adatok;
  }*/
  HirlevelEltavolit(): Promise<void> {
    const hirlevelsub = this.currentUserData.hirlevelsub === 'igen' ? 'nem' : 'igen';
    return this.authService.updateUserData({ hirlevelsub })
      .then(() => {
        this.loadUserData();
      })
      .catch((error) => {
        console.error('Hiba a hírlevél feliratkozás eltávolítása során:', error);
        alert('Hiba történt a hírlevél feliratkozás eltávolítása során.');
      });
  }
  HirlevelHozzaad(): Promise<void> { 
    const hirlevelsub = this.currentUserData.hirlevelsub === 'nem' ? 'igen' : 'nem';
    return this.authService.updateUserData({ hirlevelsub })
      .then(() => {
        this.loadUserData();
      })
      .catch((error) => {
        console.error('Hiba a hírlevél feliratkozás frissítése során:', error);
        alert('Hiba történt a hírlevél feliratkozás frissítése során.');
      });
  }
  /*SzallitasEltavolit(): void{
    const felhasznalo = this.felhasznaloService.getFelhasznalo();
    if(felhasznalo){
      this.felhasznaloService.updateFelhasznalo({ ...felhasznalo, szallitasi_adatok: '' });
      this.router.navigate(['/profil']);
    }
  }*/
  
  /*SzallitasHozzaad(): void {
    this.router.navigate(['/szallitasiadatok']);
  }*/

  kijelentkezes(): void{
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
    })
  }
  deleteAccount(): void{
    if(this.veglegesJelszo) {
      this.authService.deleteAccount(this.veglegesJelszo)
        .then(() => {
          console.log("Account deleted successfully");
          localStorage.setItem("bejelentkezve-e", "false");
          this.router.navigate(['/fomenu']);
        })
        .catch(error => {
          console.error("Error deleting account:", error);
        });
    }
    
  }
  showDeleteAccount(): void {
    this.fiokTorles = true;
  }
  showUpdatePassword(): void {
    this.jelszoFrissites = true;
  }
  async updatePassword(): Promise<void> {
    if(!this.oldPass || !this.newPass) {
      return;
    }

    if(this.newPass.length < 8) {
      alert("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
      return;
    }
    const user = this.currentUserData;
    if(!user) {
      console.error("Nincs bejelentkezett felhasználó.");
      return;
    }
    try{
      await this.authService.reauthenticateUser(this.oldPass);

      await this.authService.updatePassword(this.newPass);
      console.log("Password updated successfully");
      this.oldPass = '';
      this.newPass = '';
      this.jelszoFrissites = false;
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Hiba történt a jelszó frissítése során.");
    }
  }
}
