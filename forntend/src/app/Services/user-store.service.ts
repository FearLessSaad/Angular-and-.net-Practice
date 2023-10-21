import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private role$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(name:string){
    this.fullName$.next(name);
  }
}
