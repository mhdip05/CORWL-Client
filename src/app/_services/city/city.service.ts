import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take } from 'rxjs';
import {
  CityEmpty,
  CityListByCountrySuccessAction,
  CityListRequestAction,
} from 'src/app/_redux/action/city-action';
import {
  getCityByCountry,
  getCityLoaded,
  getCityLoading,
  RootReducerState,
} from 'src/app/_redux/reducer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<RootReducerState>
  ) {}

  getCityByCountryApi(countryId: number, callToStore: boolean = false) {
    if (callToStore) {
      this.store.dispatch(new CityEmpty());
    }
    return this.httpClient
      .get(environment.apiUrl + 'city/GetCityByCountry?countryId=' + countryId)
      .pipe(
        map((res: any) => {
          //console.log(res);
          if (callToStore) {
            this.store.dispatch(
              new CityListByCountrySuccessAction({ data: res })
            );
          }
          return res;
        })
      );
  }

  getAllCitiesByCountry(
    countryId: number
  ): [Observable<boolean>, Observable<any>] {
    const loaded$ = this.store.select(getCityLoaded);
    const loading$ = this.store.select(getCityLoading);
    const cityData$ = this.store.select(getCityByCountry);

    combineLatest([loaded$, loading$])
    .pipe(take(1))
    .subscribe((data) => {
      if (!data[0] && !data[1]) {
        this.store.dispatch(new CityListRequestAction());
        this.getCityByCountryApi(countryId).subscribe((res) => {
          this.store.dispatch(
            new CityListByCountrySuccessAction({ data: res })
          );
        });
      }
    });

    return [loading$, cityData$];
  }

  getAllCity() {
    return this.httpClient.get(environment.apiUrl + 'city/GetAllCity').pipe(
      map((res) => {
        //console.log(res)
        return res;
      })
    );
  }

  editCity(model: any) {
    return this.httpClient
      .put(environment.apiUrl + 'city/update-city', model)
      .pipe(
        map((res) => {
          //console.log(res);
        })
      );
  }

  addCity(model: any) {
    return this.httpClient
      .post(environment.apiUrl + 'city/add-city', model)
      .pipe(
        map((res) => {
          //console.log(res);
          return res;
        })
      );
  }
}
