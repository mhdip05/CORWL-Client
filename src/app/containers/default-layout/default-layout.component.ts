import { Component, OnInit } from '@angular/core';
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

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private authService: AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user: any) => {
        this.currentUserRoles = user?.roles;
      },
    });

    this.navByRole();
  }

  ngOnInit(): void {
    this.customIndex.forEach((index) => {
      //console.log(index)
      this.navItems[index] = {};
    });
  }

  private navByRole() {
    for (const [key, value] of Object.entries(this.navItems)) {
      if (typeof value.role == 'undefined') {
        continue;
      }

      var index = parseInt(key);
      //console.log(index,value)
      var intersections = value.role.filter(
        (e: any) => this.currentUserRoles.indexOf(e) !== -1
      );

      if (
        intersections.length == 0 &&
        intersections !== this.currentUserRoles
      ) {
        this.customIndex.push(index);
      }
    }
  }
}
