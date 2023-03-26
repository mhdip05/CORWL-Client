import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../_services/loading.service';
import { UtilsService } from '../_services/utils/utils.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private utilService: UtilsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.utilService.turnLoadingBarOn == true) {
      this.loadingService.busy();
    }

    return next.handle(request).pipe(
      //delay(5000),
      finalize(() => {
        //console.log('dip',request)
        this.loadingService.idle();
      })
    );
  }
}
