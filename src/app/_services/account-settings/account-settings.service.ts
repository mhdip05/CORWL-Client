import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService {
  apiUrl = environment.apiUrl + 'AccountSettings/';
  
  constructor(private http: HttpClient) {}

  changePassword(model: any) {
    return this.http.post(this.apiUrl + 'Change-Password', model).pipe(
      map((response: any) => {
        //console.log('dip',response)
        return response;
      })
    );
  }

  changeUsername(model: any) {
    return this.http.post(this.apiUrl + 'change-username', model);
  }

  changeEmail(model: any) {
    return this.http.post(this.apiUrl + 'change-email', model);
  }

  sendCodeToEmail(model: any) {
    return this.http.post(this.apiUrl + 'SendCodeToEmail', model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  ResetPassowrd(model: any) {
    return this.http.post(this.apiUrl + 'ResetPassword', model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
