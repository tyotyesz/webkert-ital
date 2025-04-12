import { Component } from '@angular/core';
import { Termek, TermekekObject } from '../../shared/models/termekek';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alkoholos',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './alkoholos.component.html',
  styleUrl: './alkoholos.component.scss'
})
export class AlkoholosComponent {
  TermekObject = TermekekObject;
  constructor(private felhasznaloService: FelhasznaloService) {}

  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }
}
