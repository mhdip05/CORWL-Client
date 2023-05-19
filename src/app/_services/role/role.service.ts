import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  addRole(model: any) {
    return this.http.post(environment.apiUrl + 'Role/addrole', model);
  }

  updateRole(model: any) {
    return this.http.put(environment.apiUrl + 'Role/updateRole', model);
  }

  getAllRole() {
    return this.http.get(environment.apiUrl + 'Role/GetAllRoles');
  }

  getUserRoles(employeeId:number){
    return this.http.get(environment.apiUrl + 'Role/GetUserRoles/'+employeeId);
  }

  mapUserRole(model: any) {
    return this.http.post(environment.apiUrl + 'Role/MapUserRole', model);
  }

  removeUserRole(employeeId:number, roleId:number){
    return this.http.delete(environment.apiUrl + 'Role/RemoveRoleMapping/'+employeeId+'/'+roleId)
  }
}
