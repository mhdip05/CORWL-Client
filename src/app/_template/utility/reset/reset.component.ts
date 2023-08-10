import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  
  display = true;
  style= "border:2px solid;"

  constructor() {}

  ngOnInit(): void {

  }


}
