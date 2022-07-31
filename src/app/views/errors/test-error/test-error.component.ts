import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  isDevelopment = true;
  validationErrors:string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(environment.production){
      this.isDevelopment = false;
    }
  }

  get500Error() {
    return this.http.get(environment.apiUrl+'buggy/server-error').subscribe({
      next: (res)=>{
        console.log('r'+res)
      },
    });
  }

  get400Error() {
    this.http.get(environment.apiUrl + 'buggy/bad-request').subscribe({
     next: (res) => {
       console.log('r'+res)
     },
   })
 }

 
  get404Error() {
    this.http.get(environment.apiUrl + 'buggy/not-found').subscribe({
      next: (res) => {
        console.log('r'+res)
      },
    })
  }



}
