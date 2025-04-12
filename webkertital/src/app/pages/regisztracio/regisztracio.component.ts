import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { Felhasznalo } from '../../shared/models/felhasznalok';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-regisztracio',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './regisztracio.component.html',
  styleUrl: './regisztracio.component.scss'
})
export class RegisztracioComponent {
  regiForm!: FormGroup;
  regiError = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private felhasznaloService: FelhasznaloService,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.inic();
  }

  inic() {
    this.regiForm = this.formBuilder.group({
      vezeteknev:['', Validators.required],
      keresztnev:['', Validators.required],
      email:['', Validators.email],
      jelszo:['', Validators.minLength(8)],
      jelszoujra:['', Validators.minLength(8)],
      telefonszam:['', [Validators.pattern(/^(\+36|06)(20|30|70)\d{7}$/)]]
    });
  }

  signup(): void{
    if(this.regiForm.valid){
      this.loading = true;
      const {vezeteknev, keresztnev, email, jelszo, jelszoujra, telefonszam} = this.regiForm.value;
      if(jelszo !== jelszoujra){
        this.regiError = true;
        return;
      }
      const ujFelhasznalo = new Felhasznalo(Felhasznalo.felhaszId, vezeteknev, keresztnev, email, jelszo, telefonszam, '', false, 'utanvet', 'nem');
      this.felhasznaloService.createFelhasznalo(ujFelhasznalo).subscribe(
        (response) => {
          console.log("Sikeres létrehozás: ", response);
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/bejelentkezes']);
          }, 2000);
          
        }
      );
    } else{
      console.error("Invalid Form");
    }
  }

  isLoggedIn(): boolean{
    return this.felhasznaloService.isLogged();
  }

}
