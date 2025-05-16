import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {

  private userSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  felhasznalo$ = this.userSubject.asObservable();
  private felhasznalo: any | null = null;
  private isLoggedIn: boolean = false;
  private isAdmin: boolean = false;

  constructor() {
    /*this.loadUser();*/
  }


  setFelhasznalo(ujFelhasznalo: any): void{
    this.felhasznalo = ujFelhasznalo;
    localStorage.setItem('felhasznaloEmail', ujFelhasznalo.email);
    localStorage.setItem('bejelentkezve-e', 'true');
    localStorage.setItem('admin-e', ujFelhasznalo.admin);
    this.isLoggedIn = true;
    this.userSubject.next(this.felhasznalo);
  }

  isLogged(): boolean{
    this.isLoggedIn = localStorage.getItem('bejelentkezve-e') === 'true';
    return this.isLoggedIn;
  }

  isAdministrator(): boolean{
    this.isAdmin = localStorage.getItem('admin-e') === 'true';
    return this.isAdmin;
  }


}
