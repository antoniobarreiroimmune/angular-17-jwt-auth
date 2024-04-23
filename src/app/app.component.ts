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
  showGuardBoard = false;
  showPathologistBoard = false;
  email: string | null = null;
  private authSubscription!: Subscription; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
    this.authSubscription = this.authService.currentUser.subscribe({
      next: (user: any) => {
        console.log('User data updated from server:', user);

        
        this.isLoggedIn = !!user;
        this.email = user ? user.email : null;
        this.showGuardBoard = user && user.role && user.role.includes('Guard');
        this.showPathologistBoard = user && user.role && user.role.includes('Pathologist');
      },
      error: (error: any) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: _ => {
        console.log('Logged out and status updated');
        this.isLoggedIn = false;
        this.email = null;
        this.showGuardBoard = false;
        this.showPathologistBoard = false;
      },
      error: (err: any) => console.error('Error logging out', err)
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
