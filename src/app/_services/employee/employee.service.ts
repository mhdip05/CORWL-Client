import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeDropdown() {
    return this.http.get(environment.apiUrl + 'employee/GetEmployeeDropdown');
  }

  saveEmployeeBasicInfo(model:any){
    return this.http.post(environment.apiUrl + 'employee/SaveEmployeeBasicInfo',model);
  }

  saveEmployeeDocumentInfo(model:any){
    return this.http.post(environment.apiUrl + 'employee/SaveDocument',model)
  }
}
