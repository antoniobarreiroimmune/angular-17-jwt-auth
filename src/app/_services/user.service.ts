import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

const API_URL = 'http://localhost:3001/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'procedures', {
      responseType: 'text',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', {
      responseType: 'text',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', {
      responseType: 'text',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', {
      responseType: 'text',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
