import { ToastrService } from 'ngx-toastr';
import { IErrorModal } from './../_interface/IErrorModal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { DisplayErrorComponent } from '../modals/display-error/display-error.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private showModal = false;
  constructor(private router: Router,
    private modal: BsModalService,
    private toastr: ToastrService
  ) { }

  modalData: IErrorModal = {
    title: 'Validation',
    message: []
  }

  config: any = {
    initialState: {
      title: this.modalData.title,
      message: this.modalData.message
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(e => {
        this.modalData.message.length = 0;
        if (e.error) {
          switch (e.status) {
            case 400:
              this.showModal = true;
              if (e.error.errors) {
                for (const key in e.error.errors) {
                  //console.log(e.error.errors[key])
                  this.modalData.message.push(e.error.errors[key])
                }
                this.modalData.message.flat()
              } else if (e.error) {
                this.modalData.message.push(e.error)
              }
              break;

            case 401:
              this.showModal = true;
              this.modalData.message.push("Un-Authorized Access");
              break;

            case 404:
              this.showModal = false;
              this.router.navigateByUrl('/not-found')              
              break

            case 500:
              this.showModal = false
              const navigationExtras: NavigationExtras = { state: { error: e.error } }
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected happened')
              break;
          }
        }
        if (this.showModal == true) {
          this.modal.show(DisplayErrorComponent, this.config);
          
        }

        throw '';
      })
    )
  }
}
