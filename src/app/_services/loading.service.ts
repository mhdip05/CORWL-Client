import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loader:any;

  constructor(private loadingBar:LoadingBarService) { 
     this.loader = this.loadingBar.useRef()
  }

  busy(){
    this.loader.start()
    //console.log(this.loader);
  }

  idle(){
    this.loader.complete()
  }
}
