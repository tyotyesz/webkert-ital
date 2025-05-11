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

  /*private loadUser(): void {
    const user = localStorage.getItem('felhasznaloEmail');
    if (user){
      const tarolt = FelhasznalokObject.find(csao => csao.email === user && csao.jelszo === user);
      if (tarolt){
        this.felhasznalo = tarolt;
        this.isLoggedIn = true;
        this.isAdmin = tarolt.admin;
        this.userSubject.next(this.felhasznalo);
      }
    }
  }*/

  /*getUserId(): any {
    const felhaszEmail = localStorage.getItem('felhasznaloEmail');
    if(felhaszEmail){
      const adatok = FelhasznalokObject.find(user => user.email === felhaszEmail);
      return adatok ? adatok.id : null;
    }
  }

  getFelhasznalo(): any {
    const felhaszEmail = localStorage.getItem('felhasznaloEmail');
    if(felhaszEmail){
      const adatok = FelhasznalokObject.find(user => user.email === felhaszEmail);
      return adatok || null;
    }
    return null;
  }*/

  /*getFelhasznalok(): any[] {
    return FelhasznalokObject;
  }*/

  setFelhasznalo(ujFelhasznalo: any): void{
    this.felhasznalo = ujFelhasznalo;
    localStorage.setItem('felhasznaloEmail', ujFelhasznalo.email);
    localStorage.setItem('bejelentkezve-e', 'true');
    localStorage.setItem('admin-e', ujFelhasznalo.admin);
    this.isLoggedIn = true;
    this.userSubject.next(this.felhasznalo);
  }

  /*deleteFelhasznalo(deleteFelhasznalo: any): void{
    const index = FelhasznalokObject.findIndex(user => user.email === deleteFelhasznalo.email);
    if (index !== -1) {
      FelhasznalokObject.splice(index, 1);
      localStorage.removeItem('felhasznaloEmail');
      localStorage.removeItem('bejelentkezve-e');
      localStorage.removeItem('admin-e');
      this.isLoggedIn = false;
      this.userSubject.next(null);
    }
  }*/

  /*updateFelhasznalo(modositottFelhasznalo: any): void{
    this.felhasznalo = modositottFelhasznalo;
    const index = FelhasznalokObject.findIndex(user => user.email === this.felhasznalo.email);
    if (index !== -1) {
      FelhasznalokObject[index] = this.felhasznalo;
      localStorage.setItem('felhasznaloEmail', this.felhasznalo.email);
      localStorage.setItem('bejelentkezve-e', 'true');
      localStorage.setItem('admin-e', this.felhasznalo.admin);
      this.userSubject.next(this.felhasznalo);
    }
    
  }*/

  /*emailExists(email: string): boolean {
    return FelhasznalokObject.some(user => user.email === email);
  }*/

  /*createFelhasznalo(ujFelhasznalo: any): Observable<any>{
    FelhasznalokObject.push(ujFelhasznalo);
    return of({success: true});
  }*/

  isLogged(): boolean{
    this.isLoggedIn = localStorage.getItem('bejelentkezve-e') === 'true';
    return this.isLoggedIn;
  }

  isAdministrator(): boolean{
    this.isAdmin = localStorage.getItem('admin-e') === 'true';
    return this.isAdmin;
  }


}
