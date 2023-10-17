import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { FormValidator } from 'src/app/Helpers/formValidator.helper';
import { User } from 'src/app/Models/User.model';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye';

  signUpForm!: FormGroup;

  auth:AuthService = inject(AuthService)
  router:Router = inject(Router)

  constructor(private fb: FormBuilder){}  

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  hidePaddword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = ' fa-eye-slash' : this.eyeIcon = 'fa-eye';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  OnSubmit() {
    if(this.signUpForm.valid){
      var form: any = this.signUpForm.value
      let user:User = new User(
        form.fullname, form.username, form.email, form.tel, form.password
      )
      this.auth.signUp(user)
        .subscribe({
          next:(res:any)=>{
            this.router.navigate(["/"]);
            this.signUpForm.reset();
          },
          error:(err:any)=>{
            alert(err?.error.errors.password);
            console.log(err.error.errors)
          }
      });
      
    }else{
      FormValidator.validateFormFields(this.signUpForm);
    }
  }


}
