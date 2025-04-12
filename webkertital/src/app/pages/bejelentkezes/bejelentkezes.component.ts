import { Component } from '@angular/core';
import { FelhasznaloService } from '../../shared/services/felhasznalo.service';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';



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
    private router: Router
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
      for(let i = 0; i < this.felhasznaloServie.getFelhasznalok().length; i++){
        if(this.felhasznaloServie.getFelhasznalok()[i].jelszo == jelszo && this.felhasznaloServie.getFelhasznalok()[i].email == email){
          this.felhasznaloServie.setFelhasznalo(this.felhasznaloServie.getFelhasznalok()[i]);
          this.loginForm.reset();
          this.router.navigate(['/fomenu']);
          break;
        }
      }
    }else{
      this.loginError = true;
      return;
    }
  }

  isLoggedIn(): boolean{
    return this.felhasznaloServie.isLogged();
  }

}
