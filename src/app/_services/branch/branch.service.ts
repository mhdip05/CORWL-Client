import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = environment.apiUrl + 'branch/';
  
  constructor(private http: HttpClient) {}

  public getAllBranches() {
    return this.http.get(this.apiUrl + 'getAllBranch');
  }

  getBranchDropdown(){
    return this.http.get(this.apiUrl + 'getBranchDropdown');
  }

  addBranch(model: any) {
    return this.http.post(this.apiUrl + 'AddBranch', model);
  }

  getBranchById(id: number) {
    return this.http.get(this.apiUrl + 'GetBranchById/' + id);
  }

  updateBranch(model: any) {
    return this.http.put(this.apiUrl + 'UpdateBranch', model);
  }
}
