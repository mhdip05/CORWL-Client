import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiUrl = environment.apiUrl + 'department/'
  constructor(private http: HttpClient) {}

  getAllDepartment() {
    return this.http.get(this.apiUrl + 'getAllDepartment');
  }

  getDepartmentDropdown() {
    return this.http.get(this.apiUrl + 'GetDepartmentDropdown');
  }

  addDepartment(model: any) {
    return this.http.post(
      this.apiUrl + 'AddDepartment',
      model
    );
  }

  getDepartmentById(id: number) {
    return this.http.get(
      this.apiUrl + 'GetDepartmentById/' + id
    );
  }

  updateDepartment(model: any) {
    return this.http.put(
      this.apiUrl + 'UpdateDepartment',
      model
    );
  }
}
