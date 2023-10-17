import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from '../Models/User.model';
import { Login } from '../Models/Login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7096/api/Auth/";
  http: HttpClient = inject(HttpClient);

  signUp(user:User): any{
    return this.http.post<any>(`${this.baseUrl}Register`, user)
  }

  login(login:Login): any{
    return this.http.post<any>(`${this.baseUrl}Authenticate`,login)
  }
  
}
