import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  public getAllBranches() {
    return this.http.get(environment.apiUrl + 'branch/getAllBranch');
  }

  getBranchDropdown(){
    return this.http.get(environment.apiUrl + 'branch/getBranchDropdown');
  }

  addBranch(model: any) {
    return this.http.post(environment.apiUrl + 'branch/AddBranch', model);
  }

  getBranchById(id: number) {
    return this.http.get(environment.apiUrl + 'branch/GetBranchById/' + id);
  }

  updateBranch(model: any) {
    return this.http.put(environment.apiUrl + 'branch/UpdateBranch', model);
  }
}
