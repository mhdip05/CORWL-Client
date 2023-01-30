import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationService } from '../pagination/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class TestAppService {
  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {}

  getAllEmployeeTest(page: number, itemsPerPage: number) {
    let params = this.paginationService.getPaginationHeaders(
      page,
      itemsPerPage
    );

    return this.paginationService.getPaginatedResult(
      environment.testDataUrl + 'employee/GetAllEmployeesByPagination',
      params
    );
  }
}
