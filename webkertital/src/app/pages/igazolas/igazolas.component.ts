import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-igazolas',
  imports: [MatButtonModule],
  templateUrl: './igazolas.component.html',
  styleUrl: './igazolas.component.scss'
})
export class IgazolasComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['fomenu']);
  }

  openYoutubeVideo(): void {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
}
