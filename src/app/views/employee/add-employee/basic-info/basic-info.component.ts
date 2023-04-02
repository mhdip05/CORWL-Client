import { Component, Input, OnInit } from '@angular/core';
import { CustomModel } from './../../../../_models/CustomModel';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  //model: any = {};
  @Input() employeeId = 0;
  customModel = new CustomModel();
  constructor() {}

  ngOnInit(): void {}

  test() {
    this.employeeId = 1;
  }
}
