// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;
  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const credentials = { email, password };
    const url=this.baseUrl+'/login';
    return this.http.post<User>(url, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  saveUserData(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUserData(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('user');
  }
}
