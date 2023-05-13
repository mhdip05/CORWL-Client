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

  updateRole(model:any){
    return this.http.put(environment.apiUrl + 'Role/updateRole', model);
  }

  getAllRole(){
    return this.http.get(environment.apiUrl + 'Role/GetAllRoles')
  }

}
