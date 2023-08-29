import { ToastrService } from 'ngx-toastr';
import { IErrorModal } from './../_interface/IErrorModal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { UtilsService } from '../_services/utils/utils.service';
import { ErrorModalComponent } from '../_template/modal/error-modal/error-modal.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private showModal = false;
  constructor(
    private router: Router,
    private modal: BsModalService,
    private toastr: ToastrService,
    private utilService: UtilsService
  ) {}

  modalData: IErrorModal = {
    title: 'Validation',
    message: [],
  };

  config: any = {
    initialState: {
      title: this.modalData.title,
      message: this.modalData.message,
    },
  };

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> | any {
    if (this.utilService.turnModalStateErrorOn == false) {
      return next.handle(request);
    } else {
      return next.handle(request).pipe(
        catchError((e) => {
          this.modalData.message.length = 0;
          if (e.error) {
            switch (e.status) {
              case 400:
                this.showModal = true;
                if (e.error.errors) {
                  for (const key in e.error.errors) {
                    
                    var errors = e.error.errors[key];
                    //console.log(e.error);
                    //this.modalData.message.push(e.error.errors[key]);
                    if (errors.length == 1) {
                      this.modalData.message.push(e.error.errors[key]);
                    }
                    if (errors.length > 1) {
                      //console.log(e.error.errors[key]);
                      for (const er in e.error.errors[key]) {
                        //console.log(e.error.errors[key][er])
                        this.modalData.message.push(e.error.errors[key][er]);
                      }
                    }
                  }
                  this.modalData.message.flat();
                } else if (e.error) {
                  //console.log(e.error)
                  this.modalData.message.push(e.error);
                }
                break;

              case 401:
                this.showModal = true;
                this.modalData.message.push('Un-Authorized Access');
                break;

              case 404:
                this.showModal = false;
                this.router.navigateByUrl('/not-found');
                break;

              case 500:
                this.showModal = false;
                const navigationExtras: NavigationExtras = {
                  state: { error: e.error },
                };
                this.router.navigateByUrl('/server-error', navigationExtras);
                break;
              default:
                this.toastr.error('Something unexpected happened');
                break;
            }
          }
          if (this.showModal == true) {
            //console.log(this.modalData.message)
            this.modal.show(ErrorModalComponent, this.config);
          }
          throw '';
        })
      );
    }
  }
}
