import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { ProceduresComponent } from './procedures/list-procedures/procedures.component';
import { PathologyComponent } from './pathology/list-pathology/pathology.component';
import { CreateProcedureComponent } from './procedures/create-procedure/create-procedure.component';
import { UpdateProcedureComponent } from './procedures/update-procedure/update-procedure.component';
import { ShowProcedureComponent } from './procedures/show-procedure/show-procedure.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ProceduresComponent,
    PathologyComponent,
    CreateProcedureComponent,
    UpdateProcedureComponent,
    ShowProcedureComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    MatOptionModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
