import { Component } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TermekekObject } from '../../shared/models/termekek';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { MatListItem } from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatPaginatorModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  termkekObject = TermekekObject;

  adminForm!: FormGroup;
  constructor(
    private felhasznaloService: FelhasznaloService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.inic();
  }

  inic(){
    this.adminForm = this.formBuilder.group({
      termeknev:['', Validators.required],
      termekara:['', Validators.required],
      kategoria:['', Validators.required],
    });
  }

  isLoggedIn(): boolean {
    return this.felhasznaloService.isLogged();
  }

  isAdmin(): boolean {
    return this.felhasznaloService.isAdministrator();
  }

  adminAdd(): void{
    if(this.adminForm.valid){
      const{termeknev, termekara, kategoria} = this.adminForm.value; 
    }
  }
  termekTorles(termekId: number): void{

  }
}
