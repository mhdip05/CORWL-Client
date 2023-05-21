import { AfterViewInit, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/_services/auth/auth.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  private currentUserRoles: string[] = [];
  private customIndex: number[] = [];
  private currentUserRole = localStorage.getItem('user_role');

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  // The functionality needs to be changed while making dyanmic
  constructor(private authService: AuthService) {
    this.navByRole();
  }

  ngOnInit(): void {
    //console.log(this.customIndex)
    this.customIndex.forEach((index) => {
      this.navItems[index] = {};
    });
  }

  private navByRole() {
    //console.log(this.currentUserRole);
    for (const [key, value] of Object.entries(this.navItems)) {
      if (typeof value.role == 'undefined') {
        continue;
      }
      const index = parseInt(key);
      if (!value.role.includes(this.currentUserRole)) {
        this.customIndex.push(index);
      }
    }
  }
}
