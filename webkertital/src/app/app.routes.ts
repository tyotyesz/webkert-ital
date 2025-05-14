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
import { KeresesComponent } from './pages/kereses/kereses.component';

export const routes: Routes = [
    { path: '', redirectTo: 'igazolas', pathMatch: 'full',},
    { path: 'igazolas', component: IgazolasComponent},
    { path: 'fomenu', component: FomenuComponent},
    { path: 'kereses/:query', component: KeresesComponent},
    { path: 'uditok', component: UditokComponent},
    { path: 'alkoholos', component: AlkoholosComponent},
    { path: 'kulonleges', component: KulonlegesComponent},
    { path: 'receptek', component: ReceptekComponent},
    { path: 'bejelentkezes', component: BejelentkezesComponent},
    { path: 'profil', component: ProfilComponent},
    { path: 'regisztracio', component: RegisztracioComponent},
    { path: 'kosar', component: KosarComponent},
    { path: 'admin', component: AdminComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
