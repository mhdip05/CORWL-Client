import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = environment.apiUrl + 'Role/'
  constructor(private http: HttpClient) {}

  addRole(model: any) {
    return this.http.post(this.apiUrl + 'addrole', model);
  }

  updateRole(model: any) {
    return this.http.put(this.apiUrl + 'updateRole', model);
  }

  getAllRole() {
    return this.http.get(this.apiUrl + 'GetAllRoles');
  }

  getUserRoles(employeeId:number){
    return this.http.get(this.apiUrl + 'GetUserRoles/'+employeeId);
  }

  mapUserRole(model: any) {
    return this.http.post(this.apiUrl + 'MapUserRole', model);
  }

  removeUserRole(employeeId:number, roleId:number){
    return this.http.delete(this.apiUrl + 'RemoveRoleMapping/'+employeeId+'/'+roleId)
  }
}
