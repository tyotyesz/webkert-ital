import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FelhasznaloService } from './shared/services/felhasznalo.service';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { KosarService } from './shared/services/kosar.service';
import { KosarmennyisegService } from './shared/services/kosarmennyiseg.service';
import { KosarMennyisegObject } from './shared/models/kosarmennyiseg';
import { KosarObject } from './shared/models/kosar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatBadgeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private router: Router, 
    private felhasznaloService: FelhasznaloService, 
    private kosarService: KosarService,
    private kosarmennyisegService: KosarmennyisegService
  ) {}

  ngOnInit(): void {
    this.updateKosarMennyiseg();
  }
  
  isFomenuRoute(){
    return this.router.url !== '/igazolas';
  }
  
  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }
  isAdmin(): boolean {
    return this.felhasznaloService.isAdministrator();
  }

  updateKosarMennyiseg(): number{
    const userId = this.felhasznaloService.getUserId();
    const userKosar = KosarObject.filter(termek => termek.user_id === userId);
    return userKosar.reduce((osszeg, item) => osszeg + item.mennyi, 0);
  }
}
