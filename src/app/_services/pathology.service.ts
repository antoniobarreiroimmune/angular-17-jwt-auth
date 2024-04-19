import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

const API_URL = "http://localhost:3001/api/pathology/";

@Injectable
({
  providedIn: "root"
})

export class PathologyService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getAllPathologies(): Observable<any> {
        return this.http.get(API_URL + "list", {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.authService.getToken()}`    
            })
        });


}

    getPathologyById(id: string): Observable<any> {
        return this.http.get(API_URL + `show/${id}`, {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updatePathology(id: string, pathologyData: any): Observable<any> {
        return this.http.put(API_URL + `edit/${id}`, pathologyData, {
            headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getToken()}`
        })

    });
}
}