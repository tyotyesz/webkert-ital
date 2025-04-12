import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';

@Component({
  selector: 'app-jelszomodositas',
  imports: [
    RouterLink,
    MatListModule
  ],
  templateUrl: './jelszomodositas.component.html',
  styleUrl: './jelszomodositas.component.scss'
})
export class JelszomodositasComponent {
  constructor(
    private felhasznaloService: FelhasznaloService,
  ) {}

  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }
}
