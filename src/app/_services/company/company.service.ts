import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, take } from 'rxjs';
import {
  CompanyAddAction,
  CompanyDeleteAction,
  CompanyListRequestAction,
  CompanyListSuccessAction,
  CompanyUpdateAction,
} from 'src/app/_redux/action/company-action';
import {
  getCompanies,
  getCompanyById,
  getCompanyLoaded,
  getCompanyLoading,
  RootReducerState,
} from 'src/app/_redux/reducer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiUrl = environment.apiUrl + 'company/'
  
  constructor(
    private http: HttpClient,
    private store: Store<RootReducerState>,
    private router: Router
  ) {}

  private getAllCompaniesApi() {
    return this.http.get(this.apiUrl + 'GetAllCompanies').pipe(
      map((response: any) => {
        //console.log(response)
        return response;
      })
    );
  }

  getAllCompanies(force = false): [Observable<boolean>, Observable<any>] {
    const loading$ = this.store.select(getCompanyLoading);
    const loaded$ = this.store.select(getCompanyLoaded);
    const getCompanyData = this.store.select(getCompanies);

    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new CompanyListRequestAction());
          this.getAllCompaniesApi().subscribe((res) => {
            this.store.dispatch(new CompanyListSuccessAction({ data: res }));
          });
        }
      });
    return [loading$, getCompanyData];
  }

  getCompanyById(id: number, force = false) {
    const company$ = this.store.select((state) => getCompanyById(state, id));
    company$.pipe(take(1)).subscribe((data) => {
      if (force || !data) {
        return this.http
          .get(this.apiUrl + 'getCompanyById/' + id)
          .subscribe({
            next: (res) => {
              //console.log(res);
              this.store.dispatch(new CompanyAddAction({ data: res }));
            },
            error: (e) => {
              //console.log(e);
              //this.router.navigateByUrl("/not-found")
            },
          });
      }
      return data;
    });
    return company$;
  }

  fetchCompanyById(id: number): any {
    //return of(123)
    return this.http
      .get(this.apiUrl + 'getCompanyById/' + id)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  GetCompanyDropdown() {
    return this.http.get(this.apiUrl + 'GetCompanyDropdown');
  }

  addCompany(model: any) {
    return this.http
      .post(this.apiUrl + 'add-company', model)
      .pipe(
        map((res) => {
          console.log(res);
          this.store.dispatch(new CompanyAddAction({ data: res }));
          return res;
        })
      );
  }

  updateCompany(id: number, data: any) {
    //console.log(id)
    //return;
    return this.http
      .put(this.apiUrl + 'update-company', data)
      .pipe(
        map((res) => {
          //console.log(res)
          this.store.dispatch(new CompanyUpdateAction({ id, data: res }));
          return res;
        })
      );
  }

  deleteCompany(id: number) {
    return this.http
      .get(this.apiUrl + 'DeleteCompany?id=' + id)
      .pipe(
        map((res) => {
          //console.log(res)
          this.store.dispatch(new CompanyDeleteAction({ id }));
          return res;
        })
      );
  }
}
