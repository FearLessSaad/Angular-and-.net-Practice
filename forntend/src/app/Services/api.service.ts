import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7096/api/Auth/";
  http: HttpClient = inject(HttpClient);
  
  getUsers(){
    return this.http.get(`${this.baseUrl}Users`);
  }

}
