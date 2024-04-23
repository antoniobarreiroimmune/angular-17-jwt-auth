import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'; 
import { Subscription } from 'rxjs';

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
  private userSubscription!: Subscription; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.updateUserStatus(user);
    });
  }

  updateUserStatus(user: any): void {
    this.isLoggedIn = !!user;
    if (user) {
      this.email = user.email;
     
      this.showAdminBoard = user.role.includes('Guard');
      this.showModeratorBoard = user.role.includes('Pathologist');
    } else {
      this.email = null;
      this.showAdminBoard = false;
      this.showModeratorBoard = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: _ => {
    
      },
      error: err => console.error('Error logging out', err)
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();  
    }
  }
}
