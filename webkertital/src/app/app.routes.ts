import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FomenuComponent } from './pages/fomenu/fomenu.component';
import { UditokComponent } from './pages/uditok/uditok.component';
import { AlkoholosComponent } from './pages/alkoholos/alkoholos.component';
import { KulonlegesComponent } from './pages/kulonleges/kulonleges.component';
import { ReceptekComponent } from './pages/receptek/receptek.component';
import { AppComponent } from './app.component';
import { IgazolasComponent } from './pages/igazolas/igazolas.component';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { KosarComponent } from './pages/kosar/kosar.component';
import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { AdminComponent } from './pages/admin/admin.component';
import { JelszomodositasComponent } from './pages/jelszomodositas/jelszomodositas.component';
import { SzallitasiadatokComponent } from './pages/szallitasiadatok/szallitasiadatok.component';
import { KeresesComponent } from './pages/kereses/kereses.component';

export const routes: Routes = [
    { path: '', redirectTo: 'igazolas', pathMatch: 'full',},
    { path: 'igazolas', component: IgazolasComponent},
    { path: 'fomenu', component: FomenuComponent},
    { path: 'kereses', component: KeresesComponent},
    { path: 'uditok', component: UditokComponent},
    { path: 'alkoholos', component: AlkoholosComponent},
    { path: 'kulonleges', component: KulonlegesComponent},
    { path: 'receptek', component: ReceptekComponent},
    { path: 'bejelentkezes', component: BejelentkezesComponent},
    { path: 'profil', component: ProfilComponent},
    { path: 'jelszomodositas', component: JelszomodositasComponent },
    { path: 'szallitasiadatok', component: SzallitasiadatokComponent},
    { path: 'regisztracio', component: RegisztracioComponent},
    { path: 'kosar', component: KosarComponent},
    { path: 'admin', component: AdminComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
