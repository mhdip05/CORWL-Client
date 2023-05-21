import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  apiUrl = environment.apiUrl + 'designation/'

  constructor(private http: HttpClient) { }

  getAllDesignation() {
    return this.http.get(this.apiUrl + 'getAllDesignation');
  }

  getDesignationDropdown(){
    return this.http.get(this.apiUrl + 'GetDesignationDropdown');
  }

  addDesignation(model: any) {
    return this.http.post(
      this.apiUrl + 'AddDesignation',
      model
    );
  }

  getDesignationById(id: number) {
    return this.http.get(
      this.apiUrl + 'GetDesignationById/' + id
    );
  }

  updateDesignation(model: any) {
    return this.http.put(
      this.apiUrl + 'UpdateDesignation',
      model
    );
  }
}
