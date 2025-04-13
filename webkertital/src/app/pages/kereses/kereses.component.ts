import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-kereses',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './kereses.component.html',
  styleUrl: './kereses.component.scss'
})
export class KeresesComponent {

}
