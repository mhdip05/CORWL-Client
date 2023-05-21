import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take } from 'rxjs';
import {
  CountryAddAction,
  CountryListRequestAction,
  CountryListSuccessAction,
  CountryUpdateAction,
} from 'src/app/_redux/action/country-action';
import {
  getCountries,
  getCountryLoaded,
  getCountryLoading,
  RootReducerState,
} from 'src/app/_redux/reducer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiUrl = environment.apiUrl + 'country/';
  
  constructor(
    private http: HttpClient,
    private store: Store<RootReducerState>
  ) {}

  getAllCountriesApi() {
    return this.http.get(this.apiUrl + 'getAllCountries');
  }

  getAllCountries(): [Observable<boolean>, Observable<any>] {
    const loaded$ = this.store.select(getCountryLoaded);
    const loading$ = this.store.select(getCountryLoading);
    const countryData$ = this.store.select(getCountries);

    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        if (!data[0] && !data[1]) {
          this.store.dispatch(new CountryListRequestAction());
          this.getAllCountriesApi().subscribe((res: any) => {
            this.store.dispatch(new CountryListSuccessAction({ data: res }));
          });
        }
      });
    return [loaded$, countryData$];
  }

  getCountries() {
    return this.http.get(this.apiUrl + 'GetCountryDropdown');
  }

  addCountry(model: any) {
    return this.http
      .post(this.apiUrl + 'add-country', model)
      .pipe(
        map((res: any) => {
          this.store.dispatch(new CountryAddAction({ data: res.data }));
          return res;
        })
      );
  }

  updateCountry(id:number, model: any) {
    return this.http
      .put(this.apiUrl + 'update-country', model)
      .pipe(
        map((res: any) => {
          this.store.dispatch(new CountryUpdateAction({ id, data: res.data }));
          return res;
        })
      );
  }
}
