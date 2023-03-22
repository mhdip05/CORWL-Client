import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getAllDepartment() {
    return this.http.get(environment.apiUrl + 'department/getAllDepartment');
  }

  getDepartmentDropdown() {
    return this.http.get(environment.apiUrl + 'department/GetDepartmentDropdown');
  }

  addDepartment(model: any) {
    return this.http.post(
      environment.apiUrl + 'department/AddDepartment',
      model
    );
  }

  getDepartmentById(id: number) {
    return this.http.get(
      environment.apiUrl + 'department/GetDepartmentById/' + id
    );
  }

  updateDepartment(model: any) {
    return this.http.put(
      environment.apiUrl + 'department/UpdateDepartment',
      model
    );
  }
}
