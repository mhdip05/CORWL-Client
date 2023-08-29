import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, filter, map, of, switchMap, take } from 'rxjs';
import { EmployeeService } from '../_services/employee/employee.service';

@Injectable({
  providedIn: 'root',
})

export class EmployeeResolver implements Resolve<boolean> {
  constructor(private employeeService: EmployeeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    const id = route.params['id'];
    let cd = of(id).pipe(
      map((id) => id),
      switchMap((id) => this.employeeService.updateEmployeeBasicInfo(id)),
      filter((res) => !!res),
      take(1)
    );

    return of(cd);
  }
}
