import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AuthService } from './_services/auth/auth.service';
import { IUser } from './_interface/IUser';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: `<ngx-loading-bar
              height="4px"
              color="#0d6efd"
              [includeSpinner] = false
            >

            </ngx-loading-bar> 
             <router-outlet></router-outlet>`,
})

export class AppComponent implements OnInit {
  title = 'NMS';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private authService: AuthService,
    private primengConfig: PrimeNGConfig
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.setCurrentUser();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    
  }

  setCurrentUser() {
    const user: IUser = JSON.parse(localStorage.getItem('0F340967EE56C835881A40DA48CE1D472C3DD368217A83DCB5074EB97BB367FBB3CB008FC9F7C86D075392F3D44DC97008BD04F328B36DED48DEC57230581E91')!)
    if (user) {
      this.authService.setCurrentUser(user)
    }
  }
}
