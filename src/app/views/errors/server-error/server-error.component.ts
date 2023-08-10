import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

  isDevelopment = true;
  errors: any;

  constructor(private router:Router) {
    const navigation = this.router.getCurrentNavigation();

    this.errors = navigation?.extras?.state?.['error'];
  }

  ngOnInit(): void {
    if(environment.production){
      this.isDevelopment = false;
    }
  }

}
