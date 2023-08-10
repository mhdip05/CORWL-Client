import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  applyLoadingService = true;
  loader: any;

  constructor(private loadingBar: LoadingBarService) {
    this.loader = this.loadingBar.useRef();
  }

  busy() {
    if (this.applyLoadingService) {
      this.loader.start();
    } else {
      this.idle();
    }
    //console.log(this.loader);
  }

  idle() {
    this.loader.complete();
  }
}
