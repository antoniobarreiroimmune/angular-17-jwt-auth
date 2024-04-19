import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProceduresComponent } from './procedures/list-procedures/procedures.component';
import { PathologyComponent } from './pathology/list-pathology/pathology.component';
import { CreateProcedureComponent } from './procedures/create-procedure/create-procedure.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'procedures', component: ProceduresComponent},
  { path: 'create-procedure', component: CreateProcedureComponent},
  { path: 'pathology', component: PathologyComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
