import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TermekekService } from '../../shared/services/termekek.service';

@Component({
  selector: 'app-kulonleges',
  imports: [[MatCardModule, MatIconModule, MatButtonModule, CommonModule]],
  templateUrl: './kulonleges.component.html',
  styleUrl: './kulonleges.component.scss'
})
export class KulonlegesComponent implements OnInit {
  kulonlegesTermekek: any[] = [];
  constructor(private termekekService: TermekekService) {}

  ngOnInit(): void {
    this.termekekService.getProductsByCategory('kulonleges')
      .then(products => {
        this.kulonlegesTermekek = products;
        console.log(this.kulonlegesTermekek);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }
}
