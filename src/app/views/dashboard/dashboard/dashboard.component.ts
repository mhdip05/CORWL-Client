import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   userRole = localStorage.getItem('user_role');
  constructor() { }

  ngOnInit(): void {

  }

}
