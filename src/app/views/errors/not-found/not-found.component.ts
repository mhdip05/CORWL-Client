import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  isLoogedIn = false;
  constructor(private location: Location, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoogedIn = false;
    this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
       if(user){
        this.isLoogedIn = true;
       }
    });
  }

  previousUrl() {
    this.location.back();
  }
}
