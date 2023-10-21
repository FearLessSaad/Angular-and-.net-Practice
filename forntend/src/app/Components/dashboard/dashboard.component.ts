import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  api: ApiService = inject(ApiService);
  userStore: UserStoreService = inject(UserStoreService);
  auth: AuthService = inject(AuthService);

  users: any = [];
  fullname: string = "";
  role: string = "";

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullname = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    if(this.role === "admin"){
      this.api.getUsers().subscribe(res=>{
        console.log(res);
        this.users = res
      });
    }
  }

}
