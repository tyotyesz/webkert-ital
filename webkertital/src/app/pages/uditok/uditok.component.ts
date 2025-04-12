import { Component } from '@angular/core';
import { Termek, TermekekObject } from '../../shared/models/termekek';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';

@Component({
  selector: 'app-uditok',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './uditok.component.html',
  styleUrl: './uditok.component.scss'
})
export class UditokComponent {
  TermekObject = TermekekObject;
  constructor(private felhasznaloService: FelhasznaloService) { }

  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }
}
