import { Component } from '@angular/core';
import { Termek, TermekekObject } from '../../shared/models/termekek';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kulonleges',
  imports: [[MatCardModule, MatIconModule, MatButtonModule]],
  templateUrl: './kulonleges.component.html',
  styleUrl: './kulonleges.component.scss'
})
export class KulonlegesComponent {
  TermekObject = TermekekObject;
  constructor(private felhasznaloService: FelhasznaloService) {}
  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }
}
