import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl: string = environment.apiUrl + 'file/';

  constructor(private http: HttpClient) {}

  getAzureToken = () => {
    return this.http.get(this.apiUrl + 'GetAzureStorageContainerToken');
  };

}
