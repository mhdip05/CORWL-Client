import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  constructor(private http:HttpClient) { }

  changePassword(model: any) {
    return this.http.post(environment.apiUrl + "AccountSettings/Change-Password", model).pipe(
      map((response: any) => {
        //console.log('dip',response)
        return response;
      })
    )
  }

  sendCodeToEmail(model:any){
    return this.http.post(environment.apiUrl + "AccountSettings/SendCodeToEmail", model).pipe(
      map((response:any)=>{
        return response;
      })
    )
  }

  ResetPassowrd(model:any){
    return this.http.post(environment.apiUrl + "AccountSettings/ResetPassword", model).pipe(
      map((response:any)=>{
        return response;
      })
    )
  }
}
