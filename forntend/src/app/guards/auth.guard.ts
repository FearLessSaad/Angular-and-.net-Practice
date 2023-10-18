import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth: AuthService = new AuthService();
  let router: Router = new Router();
  let toast: NgToastService = inject(NgToastService);

  if(auth.isLogedIn()){
    return true;
  }else{
    router.navigate(['login']);
    toast.error({detail:"Access Denied!",summary:'Unauthorized Access Please Login First To Use Dashboard.', duration:5000});
    return false;
  }
  
};
