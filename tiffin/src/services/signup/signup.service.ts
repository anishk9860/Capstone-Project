import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseURL = "http://localhost:8080/api/auth/signup";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  registerUser(user: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}`, user, this.httpOptions);
  }

}
