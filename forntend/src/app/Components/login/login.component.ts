import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { FormValidator } from 'src/app/Helpers/formValidator.helper';
import { AuthService } from 'src/app/Services/auth.service';
import { Login } from 'src/app/Models/Login.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye';

  loginForm!: FormGroup;

  auth:AuthService = inject(AuthService);
  router:Router = inject(Router);
  toast: NgToastService = inject(NgToastService)
  spinner: NgxSpinnerService = inject(NgxSpinnerService)
  

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hidePaddword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = ' fa-eye-slash' : this.eyeIcon = 'fa-eye';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  OnSubmit() {
    if(this.loginForm.valid){
      this.spinner.show()
      let login: Login = new Login(this.loginForm.value.username, this.loginForm.value.password)
      this.auth.login(login).subscribe({
        next:(res:any)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.toast.success({detail:"Success",summary:'Loggedin Successfully!', duration:5000});
          this.spinner.hide()
          this.router.navigate(["dashboard"]);
        },
        error:(err:any)=>{
          console.log(err)
          this.spinner.hide()
          this.toast.error({detail:"ERROR",summary:'Incorrect Username or Password!', duration:5000});
        }
      });
      this.loginForm.reset();
    }else{
      FormValidator.validateFormFields(this.loginForm);
    }
  }
}
