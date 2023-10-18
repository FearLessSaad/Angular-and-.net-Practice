import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-btn-sign-out',
  templateUrl: './btn-sign-out.component.html',
  styleUrls: ['./btn-sign-out.component.css']
})
export class BtnSignOutComponent {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toast: NgToastService = inject(NgToastService)

  logout(){
    this.auth.signOut();
    this.toast.success({detail:"Success",summary:'Logged Out Successfully!', duration:5000});
    this.router.navigate(['login']);
  }
}
