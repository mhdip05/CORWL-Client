import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  responsiveClass = "col-12";
  authsetResponsicClass = "col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12"
  constructor() { }

  ngOnInit(): void {
  }

}
