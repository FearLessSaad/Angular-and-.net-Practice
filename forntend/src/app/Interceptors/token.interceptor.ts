import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  auth: AuthService = inject(AuthService);
  toast: NgToastService = inject(NgToastService);
  router:Router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var token = this.auth.getToken();

    if(token){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.toast.warning({detail:"Session Expired!", summary:"Please Login Again To Use.", duration:5000});
            this.router.navigate(['login']);
          }
        }
        return throwError(()=> new Error("Something Wents Really Wrong!"));
      })
    );
  }
}
