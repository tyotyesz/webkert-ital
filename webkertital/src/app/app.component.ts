import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { KosarService } from './shared/services/kosar.service';
import { AuthService } from './shared/services/auth.service';

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
    MatBadgeModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  kosarMennyiseg: number = 0;
  currentUserData: any = null;
  constructor(
    private router: Router,
    private kosarService: KosarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateKosarMennyiseg();
    this.currentUserData = this.authService.getUserData();
    this.kosarService.cartChanged.subscribe(() => {
      this.updateKosarMennyiseg();
    });
  }
  
  isFomenuRoute(){
    return this.router.url !== '/igazolas';
  }
  
  isLoggedIn(): boolean {
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }
  isAdmin(): boolean {
    return localStorage.getItem('admin-e') === 'true';
  }
  kereses(query: string): void{
    if(query.trim()){
      this.router.navigate(["/kereses", query]);
    }
    
  }
  async updateKosarMennyiseg() {
    if(this.isLoggedIn()) {
      this.kosarMennyiseg = await this.kosarService.getCartQuantity();
    }else {
      this.kosarMennyiseg = 0;
    }
  }
}
