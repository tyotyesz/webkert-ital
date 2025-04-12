import { Component } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-admin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {


  adminForm!: FormGroup;
  constructor(
    private felhasznaloService: FelhasznaloService,
    private formBuilder: FormBuilder
  ) {}

  

  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }

  isAdmin(): boolean {
    return this.felhasznaloService.isAdministrator();
  }

}
