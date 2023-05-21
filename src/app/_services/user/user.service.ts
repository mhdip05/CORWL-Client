import { PaginationService } from './../pagination/pagination.service';
import { IUser } from 'src/app/_interface/IUser';
import { IPagination, PaginatedResult } from './../../_interface/IPagination';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + 'user/'
  paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();

  constructor(
    private http: HttpClient,
    private paginationServices: PaginationService
  ) {}

  getAllUser(page: number, itemsPerPage: number) {
    let params = this.paginationServices.getPaginationHeaders(
      page,
      itemsPerPage
    );
    return this.paginationServices.getPaginatedResult<IUser[]>(
      this.apiUrl + 'getAllUsers',params
    );
  }

  getUserData = (employeeId: number) => {
    return this.http.get(
      this.apiUrl + 'GetUserData/' + employeeId
    );
  };

  saveUserData = (model: any) => {
    return this.http.post(this.apiUrl + 'SaveUserInfo', model);
  };

  updateUserInfo = (model:any) => {
    //console.log(model)
    return this.http.put(this.apiUrl + 'UpdateUserInfo', model);
  }

  updateUserPassword = (model:any) => {
    return this.http.put(this.apiUrl + 'UpdateUserPassword', model);
  }

}
