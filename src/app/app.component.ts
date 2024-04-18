import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
    console.log('Current user:', user);  

    this.isLoggedIn = !!user;
    if (user) {
      this.email = user.email;
      this.showAdminBoard = user.role === 'Guard';
      this.showModeratorBoard = user.role === 'Moderator';
      console.log('Access: Admin:', this.showAdminBoard, 'Moderator:', this.showModeratorBoard);  
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
        console.log('Logged out and status updated');  
      },
      error: err => console.error('Error logging out', err)
    });
  }
}
