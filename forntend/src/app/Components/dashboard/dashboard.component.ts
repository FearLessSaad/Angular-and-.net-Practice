import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  api: ApiService = inject(ApiService);
  users: any = [];

  ngOnInit(): void {
    this.api.getUsers().subscribe(res=>{
      console.log(res);
      this.users = res
    });
  }

}
