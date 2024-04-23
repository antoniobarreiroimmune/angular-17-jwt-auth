import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode'; 
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
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.authStatusSubject = new BehaviorSubject<boolean>(false);
    this.initSession();
  }

  private initSession(): void {
    const token = this.getToken();
    if (token) {
      const user = jwtDecode<{ id: string, name: string, email: string, role: string[] }>(token);
      this.currentUserSubject.next(user);
      this.authStatusSubject.next(true);
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', { email, password }, httpOptions).pipe(
      map((res: any) => {
        if (res && res.token) {
          localStorage.setItem('authToken', res.token);
          const user = jwtDecode<{ id: string, name: string, email: string, role: string[] }>(res.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.authStatusSubject.next(true);
          this.router.navigate(['/home']);
        }
        return res;
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }

  public logout(): Observable<any> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']);
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  public getAuthStatus(): Observable<boolean> {
    return this.authStatusSubject.asObservable();
  }

  public register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, password }, httpOptions).pipe(
      catchError(error => {
        console.error('Error during registration:', error);
        return throwError(error);
      })
    );
  }
}
