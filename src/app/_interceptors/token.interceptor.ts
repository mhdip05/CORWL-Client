import { AuthService } from './../_services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { IUser } from '../_interface/IUser';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSerivce: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let currentUser!: IUser | null

    this.authSerivce.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        currentUser = user;
      }
    });

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request);
  }
}
