import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TermekekService } from '../../shared/services/termekek.service';

@Component({
  selector: 'app-uditok',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './uditok.component.html',
  styleUrl: './uditok.component.scss'
})
export class UditokComponent implements OnInit{
  uditoTermekek: any[] = [];
  constructor(private termekekService: TermekekService) { }

  ngOnInit(): void {
    this.termekekService.getProductsByCategory('uditok')
      .then(products => {
        this.uditoTermekek = products;
        console.log(this.uditoTermekek);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }
}
