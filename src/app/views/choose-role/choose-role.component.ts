import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss'],
})
export class ChooseRoleComponent implements OnInit {
  roles = [];
  constructor(
    private authService: AuthService,
    private routeService: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
    .pipe(take(1)).subscribe({
      next: (user: any) => {
        //console.log(user.roles)
        this.roles = user?.roles;
      },
    });
  }

  setRole(role: string) {
    localStorage.setItem('user_role', role);
    location.replace('/dashboard');
  }

  logout() {
    this.authService.logout();
  }
}
