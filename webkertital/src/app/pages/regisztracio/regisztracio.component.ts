import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { Felhasznalo } from '../../shared/models/felhasznalok';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';

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
    private router: Router,
    private authService: AuthService
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

      const userData: Partial<Felhasznalo> = {
        vezeteknev: vezeteknev,
        keresztnev: keresztnev,
        email: email,
        telefonszam: telefonszam,
        szallitasi_adatok: '',
        admin: false,
        fizetesi_adatok: '',
        hirlevelsub: 'nem',
        kosar: [],
        orders: []

      }

      this.authService.signUp(email, jelszo, userData)
       .then(userCredential => {
        console.log("Registration successful: ", userCredential.user);
        this.authService.updateLoginStatus(true);
        this.authService.getAdminStatus(userCredential.user.uid).then(isAdmin => {
          if (isAdmin) {
            localStorage.setItem('admin-e', 'true');
          } else {
            localStorage.setItem('admin-e', 'false');
          }
          this.router.navigateByUrl('/fomenu');
        });
        
       })
        .catch(error => {
          console.error("Registration error: ", error);
          this.regiError = true;
          this.loading = false;
        });
    } else{
      console.error("Invalid Form");
    }
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }

}
