import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) { }

  getAllDesignation() {
    return this.http.get(environment.apiUrl + 'designation/getAllDesignation');
  }

  addDesignation(model: any) {
    return this.http.post(
      environment.apiUrl + 'designation/AddDesignation',
      model
    );
  }

  getDesignationById(id: number) {
    return this.http.get(
      environment.apiUrl + 'designation/GetDesignationById/' + id
    );
  }

  updateDesignation(model: any) {
    return this.http.put(
      environment.apiUrl + 'designation/UpdateDesignation',
      model
    );
  }
}
