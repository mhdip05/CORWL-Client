import { PaginatedResult } from './../../_interface/IPagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  public getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber?.toString());
    params = params.append('pageSize', pageSize?.toString());

    return params;
  }

  public getPaginatedResult<T>(url: any, params: any) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response: any) => {
        //console.log(response)
        paginatedResult.result = response.body;
        const paginationHeader = response.headers.get('Pagination');

        if (paginationHeader !== null)
          paginatedResult.pagination = JSON.parse(paginationHeader);
        return paginatedResult;
      })
    );
  }
}
