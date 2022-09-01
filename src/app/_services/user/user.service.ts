import { PaginationService } from './../pagination/pagination.service';
import { IUser } from 'src/app/_interface/IUser';
import { IPagination, PaginatedResult } from './../../_interface/IPagination';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>()

  constructor(private http: HttpClient, private paginationServices: PaginationService) { }

  getAllUser(page: number, itemsPerPage: number) {

    let params = this.paginationServices.getPaginationHeaders(page, itemsPerPage)

    return this.paginationServices.getPaginatedResult<IUser[]>(environment.apiUrl + "user/getAllUsers", params);
  }
}
