import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseURL = "http://localhost:8080/api/auth/login";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  authenticateLogin(userLoginDetails: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}`, userLoginDetails, this.httpOptions);
  }

  // authenticateLogin(email: String, password: String): Observable<boolean> {
  //   return this.httpClient.get<boolean>(`${this.baseURL}/${email}/${password}`);
  // }

}
