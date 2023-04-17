import { Component, OnInit } from '@angular/core';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();
  uploadedFiles: any = [];

  constructor() {}

  ngOnInit(): void {}


  addUserInfo(){
    console.log(this.customModel.model)
  }
}
