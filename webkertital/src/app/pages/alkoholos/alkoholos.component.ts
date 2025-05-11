import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TermekekService } from '../../shared/services/termekek.service';

@Component({
  selector: 'app-alkoholos',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './alkoholos.component.html',
  styleUrl: './alkoholos.component.scss'
})
export class AlkoholosComponent implements OnInit {
  alkoholosTermekek: any[] = [];
  constructor(private termekekService: TermekekService) {}

  ngOnInit(): void {
    this.termekekService.getProductsByCategory('alkoholos')
      .then(products => {
        this.alkoholosTermekek = products;
        console.log(this.alkoholosTermekek);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }
}
