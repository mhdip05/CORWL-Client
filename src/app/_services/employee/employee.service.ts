import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationService } from '../pagination/pagination.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private paginationServices: PaginationService,
    private router: Router
  ) {}

  getEmployeeDropdown() {
    return this.http.get(environment.apiUrl + 'employee/GetEmployeeDropdown');
  }

  saveEmployeeBasicInfo(model: any) {
    return this.http.post(
      environment.apiUrl + 'employee/SaveEmployeeBasicInfo',
      model
    );
  }

  getEmployeeBasicInfo(employeeId: number) {
    return this.http
      .get(environment.apiUrl + 'employee/GetEmployeeBasicInfo/' + employeeId)
      .pipe(
        map((res: any) => {
          //console.log(res)
          if (res.status == false) {
            this.router.navigateByUrl('/404');
            return;
          }
          const dateObj = {
            dob: new Date(res.data.dob),
          };
          var data = { ...res.data, ...dateObj };
          return data;
        })
      );
  }

  getAllEmployee(page: number, itemsPerPage: number) {
    let params = this.paginationServices.getPaginationHeaders(
      page,
      itemsPerPage
    );

    return this.paginationServices.getPaginatedResult<any>(
      environment.apiUrl + 'employee/GetAllEmployee',
      params
    );
  }

  saveEmployeeDocumentInfo(model: any) {
    return this.http.post(environment.apiUrl + 'employee/SaveDocument', model);
  }

  updateEmployeeBasicInfo(model: any) {
    return this.http
      .put(environment.apiUrl + 'employee/UpdateEmployeeBasicInfo', model)
      .pipe(
        map((res: any) => {
          //console.log(res)
          const dateObj = {
            dob: new Date(res.data.dob),
          };
          var data = { ...res.data, ...dateObj };
          return {
            data,
            message: res.message,
          };
        })
      );
  }

  getDocumentMasterInfoByEmployee(employeeId: number) {
    return this.http.get(
      environment.apiUrl + 'employee/GetDocumentInfoByEmployee/' + employeeId
    );
  }

  updateDocumentMaster(model:any){
    return this.http.put(
      environment.apiUrl + 'employee/UpdateDocumentMaster/', model
    );
  }

  deleteEmpoloyeeDoc(fileId: number, empId: number) {
    return this.http.delete(
      environment.apiUrl + 'employee/DeleteEmployeeDoc/' + fileId + '/' + empId
    );
  }
}
