import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

const API_URL = 'http://localhost:3001/api/procedures/';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  constructor(private http: HttpClient, private authService: AuthService) {}

 
  createProcedure(procedureData: any): Observable<any> {
    return this.http.post(API_URL + 'create', procedureData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }


  getAllProcedures(): Observable<any> {
    return this.http.get(API_URL + 'list', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }


  getProcedureById(id: string): Observable<any> {
    return this.http.get(API_URL + `show/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  
  updateProcedure(id: string, procedureData: any): Observable<any> {
    return this.http.put(API_URL + `edit/${id}`, procedureData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
