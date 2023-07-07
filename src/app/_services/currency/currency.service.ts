import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import {} from 'src/app/_redux/reducer/currency-reducer';
import {
  CurrencyAddAction,
  CurrencyDeleteAction,
  CurrencyListRequestAction,
  CurrencyListSuccessAction,
  CurrencyUpdateAction,
} from 'src/app/_redux/action/currency-action';
import {
  getCurrencies,
  getCurrencyLoaded,
  getCurrencyLoading,
  RootReducerState,
} from 'src/app/_redux/reducer';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<RootReducerState>,
    private authService: AuthService 
  ) {}

  getCurrencies() {
    return this.httpClient
      .get(environment.apiUrl + 'currency/GetCurrencyDropdown')
      .pipe(
        map((res: any) => {
          return res;
        }),      
      );
  }

  private getAllCurrenciesApi() {
    return this.httpClient
      .get(environment.apiUrl + 'currency/GetAllCurrencies')
      .pipe(
        map((res: any, index) => {         
          return res;
        })
      );
  }

  getAllCurrencies(): [Observable<boolean>, Observable<any>] {
    const loaded$ = this.store.select(getCurrencyLoaded);
    const loading$ = this.store.select(getCurrencyLoading);
    const currenciesData$ = this.store.select(getCurrencies);

    combineLatest([loaded$, loading$])
      //.pipe(take(1))
      .subscribe((data) => {
        if (!data[0] && !data[1]) {
          this.store.dispatch(new CurrencyListRequestAction());
          this.getAllCurrenciesApi().subscribe((res) => {
            //console.log(res)
            this.store.dispatch(new CurrencyListSuccessAction({ data: res }));
          });
        }
      });
    return [loading$, currenciesData$];
  }

  editCurrency(id: number, model: any) {
    return this.httpClient
      .put(environment.apiUrl + 'currency/updatecurrency', model)
      .pipe(
        map((res: any) => {
          res.createdByName = this.authService.authUserdata.userName.toUpperCase()
          this.store.dispatch(new CurrencyUpdateAction({ id, data: res }));
          //console.log(res);
        })
      );
  }

  addCurrency(model: any) {
    return this.httpClient
      .post(environment.apiUrl + 'currency/setcurrency', model)
      .pipe(
        map((res:any) => {
          //console.log(res);
          res.createdByName = this.authService.authUserdata.userName.toUpperCase()
          this.store.dispatch(new CurrencyAddAction({ data: res }));
          return res;
        })
      );
  }

  deleteCurrency(id: number) {
    return this.httpClient
      .delete(environment.apiUrl + 'currency/DeleteCurrency?id=' + id)
      .pipe(
        map((res) => {

          this.store.dispatch(new CurrencyDeleteAction({ id }));
          return res;
        })
      );
  }
}
