import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProceduresComponent } from './procedures/list-procedures/procedures.component';
import { PathologyComponent } from './pathology/list-pathology/pathology.component';
import { CreateProcedureComponent } from './procedures/create-procedure/create-procedure.component';
import { ShowProcedureComponent } from './procedures/show-procedure/show-procedure.component';
import { ShowPathologyComponent } from './pathology/show-pathology/show-pathology.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'procedures', component: ProceduresComponent },
  { path: 'create-procedure', component: CreateProcedureComponent },
  { path: 'showprocedure/:id', component: ShowProcedureComponent },
  { path: 'pathology', component: PathologyComponent },
  { path: 'showpathology/:id', component: ShowPathologyComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
