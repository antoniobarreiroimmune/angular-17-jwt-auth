import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;  

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn; 
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: (data: any) => {
        this.isLoginFailed = false;
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
