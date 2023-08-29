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
  apiUrl = environment.apiUrl + 'employee/';
  constructor(
    private http: HttpClient,
    private paginationServices: PaginationService,
    private router: Router
  ) {}

  getEmployeeDropdown = () => {
    return this.http.get(this.apiUrl + 'GetEmployeeDropdown');
  };

  saveEmployeeBasicInfo = (model: any) => {
    return this.http.post(this.apiUrl + 'SaveEmployeeBasicInfo', model);
  };

  getEmployeeBasicInfo = (employeeId: number) => {
    return this.http
      .get(this.apiUrl + 'GetEmployeeBasicInfo/' + employeeId)
      .pipe(
        map((res: any) => {
          //console.log(res)
          const dateObj = {
            dob: new Date(res.data.dob),
          };
          if (res == null) return res.data;
          if (res.status == false) {
            this.router.navigateByUrl('/404');
            return;
          }
          return { ...res.data, ...dateObj };
        })
      );
  };

  getAllEmployee = (page: number, itemsPerPage: number) => {
    let params = this.paginationServices.getPaginationHeaders(
      page,
      itemsPerPage
    );

    return this.paginationServices.getPaginatedResult<any>(
      this.apiUrl + 'GetAllEmployee',
      params
    );
  };

  saveEmployeeDocumentInfo = (model: any) => {
    return this.http.post(this.apiUrl + 'SaveDocument', model);
  };

  updateEmployeeBasicInfo = (model: any) => {
    return this.http.put(this.apiUrl + 'UpdateEmployeeBasicInfo', model).pipe(
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
  };

  saveEmployeeJobDetails = (model: any) => {
    return this.http.post(this.apiUrl + 'SaveEmployeeJobDetails', model);
  };

  getEmployeeJobDetails = (employeeId: number) => {
    return this.http
      .get(this.apiUrl + 'GetEmployeeJobDetails/' + employeeId)
      .pipe(
        map((res: any) => {
          //console.log(res)
          if (res == null) return res;
          const dateObj = {
            confirmationDate: new Date(res.confirmationDate),
            joiningDate: new Date(res.joiningDate),
          };
          return { ...res, ...dateObj };
        })
      );
  };

  updateEmployeeJobDetails = (model: any) => {
    return this.http.put(this.apiUrl + 'UpdateEmployeeJobDetails', model);
  };

  getDocumentMasterInfoByEmployee = (employeeId: number) => {
    return this.http.get(
      this.apiUrl + 'GetDocumentInfoByEmployee/' + employeeId
    );
  };

  updateDocumentMaster = (model: any) => {
    return this.http.put(this.apiUrl + 'UpdateDocumentMaster/', model);
  };

  deleteEmpoloyeeDoc = (fileId: number, empId: number) => {
    return this.http.delete(
      this.apiUrl + 'DeleteEmployeeDoc/' + fileId + '/' + empId
    );
  };

  DeleteEmployeeDocsFromAzure = (fileId: number) => {
    return this.http.delete(
      this.apiUrl + 'DeleteEmployeeDocsFromAzure/' + fileId
    );
  };
}
