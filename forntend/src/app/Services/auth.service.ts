import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from '../Models/User.model';
import { Login } from '../Models/Login.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7096/api/Auth/";
  private userPayload: any;

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  constructor(){
    this.userPayload = this.decodeToken()
  }

  signUp(user:User): any{
    return this.http.post<any>(`${this.baseUrl}Register`, user)
  }

  login(login:Login): any{
    return this.http.post<any>(`${this.baseUrl}Authenticate`,login)
  }
  
  storeToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(): any {
    return localStorage.getItem('token')
  }

  isLogedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  signOut(){
    localStorage.removeItem('token');
  }

  decodeToken(){
    let jwtHElper = new JwtHelperService();
    let token = this.getToken();
    return jwtHElper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload) return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload) return this.userPayload.role;
  }

}
