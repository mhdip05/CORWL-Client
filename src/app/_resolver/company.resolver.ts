import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, map, Observable, of, pipe, switchMap, take } from 'rxjs';
import { CompanyService } from '../_services/company/company.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyResolver implements Resolve<any> {
  constructor(private companyService: CompanyService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    const id = route.params['id'];
     let cd = of(id)
      .pipe(
        map((id) => id),
        switchMap((id) => this.companyService.getCompanyById(id)),
        filter((res) => !!res),
        take(1)
      ) 

     return of(cd)
  }
}
