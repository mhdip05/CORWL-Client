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
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Concord Raiment Wear Ltd.';

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
    this.setCurrentUser();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  setCurrentUser() {
    const user: IUser = JSON.parse(
      localStorage.getItem(
        '0F340967EE56C835881A40DA48CE1D472C3DD368217A83DCB5074EB97BB367FBB3CB008FC9F7C86D075392F3D44DC97008BD04F328B36DED48DEC57230581E91'
      )!
    );
    if (user) {
      this.authService.setCurrentUser(user);
    }

    //console.log(user)
  }
}
