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
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      console.log('Current user:', user);  

      this.isLoggedIn = !!user;
      this.email = user ? user.email : null;
      this.showGuardBoard = user && user.role === 'Guard';
      this.showPathologistBoard = user && user.role === 'Pathologist'; 
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
