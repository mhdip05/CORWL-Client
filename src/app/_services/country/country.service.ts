import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get(environment.apiUrl + 'country/getAllCountries');
  }

  getCountries() {
    return this.http.get(environment.apiUrl + 'country/GetCountryDropdown');
  }

  addCountry(model: any) {
    return this.http
      .post(environment.apiUrl + 'country/add-country', model)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateCountry(model: any) {
    return this.http.put(environment.apiUrl + 'country/update-country', model)
  }
}
