import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: { token: string, name: string, email: string, role: string[] }): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): { token: string, name: string, email: string, role: string[] } | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public getRole(): string[] {
    const user = this.getUser();
    return user && user.role ? user.role : [];
  }

  public isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
