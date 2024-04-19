import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router'; 

const AUTH_API = 'http://localhost:3001/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authStatusSubject: BehaviorSubject<boolean>; 

  constructor(private http: HttpClient, private router: Router) { 
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
    this.authStatusSubject = new BehaviorSubject<boolean>(!!user);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', { email, password }, httpOptions).pipe(
      map((res: any) => {
        if (res && res.token) {
          localStorage.setItem('authToken', res.token);
          const user = jwtDecode(res.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.authStatusSubject.next(true);
          this.router.navigate(['/home']); 
        }
        return res;
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, password }, httpOptions);
  }

  logout(): Observable<any> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']); 
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatusSubject.asObservable();
  }
}
