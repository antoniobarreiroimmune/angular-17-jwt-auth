import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email: string | null = null;
  private authSubscription!: Subscription; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      console.log('Current user:', user);  

      this.isLoggedIn = !!user;
      this.email = user ? user.email : null;
      this.showAdminBoard = user && user.role === 'Guard';
      this.showModeratorBoard = user && user.role === 'Moderator';
      console.log('Access: Admin:', this.showAdminBoard, 'Moderator:', this.showModeratorBoard);  
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: _ => {
        console.log('Logged out and status updated');  
      },
      error: err => console.error('Error logging out', err)
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
