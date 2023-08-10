import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRole = localStorage.getItem('user_role');
    const isAuthenticated = this.authService.authUserdata !== null;

    if (isAuthenticated) {
      const hasUserRole = userRole !== null;

      if (!hasUserRole) {
        this.router.navigateByUrl('/choose-role');
        return false;
      }
      return true;
    }

    this.router.navigateByUrl('/');
    return false;
  }
}
