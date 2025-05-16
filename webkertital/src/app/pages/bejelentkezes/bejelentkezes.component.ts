import { Component } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../shared/services/auth.service';
import { AppComponent } from '../../app.component';



@Component({
  selector: 'app-bejelentkezes',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule, 
    MatButtonModule,
    RouterLinkActive,
    RouterLink,
    MatListModule
  ],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.scss'
})
export class BejelentkezesComponent {
  loginForm!: FormGroup;
  loginError = false;
  constructor(
    private formBuilder: FormBuilder,
    private felhasznaloServie: FelhasznaloService,
    private router: Router,
    private authService: AuthService,
    public appcomponent: AppComponent
  ) {}

  ngOnInit(): void{
    this.inic();
  }

  inic() {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.email],
      jelszo:['', Validators.minLength(8)]
    });
  }

  login(): void{
    if(this.loginForm.valid){
      const {email, jelszo} = this.loginForm.value;
      this.authService.signIn(email, jelszo)
      .then(userCredential => {
        console.log("Login successful", userCredential.user);
        this.authService.updateLoginStatus(true);
        this.authService.getAdminStatus(userCredential.user.uid).then(isAdmin => {
          if (isAdmin) {
            localStorage.setItem('admin-e', 'true');
          } else {
            localStorage.setItem('admin-e', 'false');
          }
          this.appcomponent.updateKosarMennyiseg();
          this.router.navigateByUrl('/fomenu');
        });
      })
      .catch(error => {
        console.error("Login error", error);
        this.loginError = true;
      })
      return;
    }else{
      console.log("Invalid form", this.loginForm.errors);
    }
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('bejelentkezve-e') === 'true';
  }

}
