import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';

@Component({
  selector: 'app-szallitasiadatok',
  imports: [
    MatListModule,
    RouterLink
  ],
  templateUrl: './szallitasiadatok.component.html',
  styleUrl: './szallitasiadatok.component.scss'
})
export class SzallitasiadatokComponent {
  constructor(
    private felhasznaloService: FelhasznaloService
  ){}

  isLoggedIn(): boolean{
    return this.felhasznaloService.isLogged();
  }

}
