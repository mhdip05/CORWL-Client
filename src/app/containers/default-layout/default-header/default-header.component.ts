import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  userRole = localStorage.getItem('user_role'); 
  username!: string;

  constructor(public authService:AuthService, 
              private classToggler: ClassToggleService,
              private router:Router) {
    super();
  }

  logout(){
    this.authService.logout();
  }
}
