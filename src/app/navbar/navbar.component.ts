import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateUserStatus();
  }

  updateUserStatus(): void {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    if (user) {
      this.email = user.email;
      this.showAdminBoard = user.role === 'Admin';
      this.showModeratorBoard = user.role === 'Moderator';
    } else {
      this.email = null;
      this.showAdminBoard = false;
      this.showModeratorBoard = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: _ => {
        this.updateUserStatus(); 
      },
      error: err => console.error('Error logging out', err)
    });
  }
}
