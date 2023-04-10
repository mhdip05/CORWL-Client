import { Component, OnInit } from '@angular/core';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel()

  constructor() { }

  ngOnInit(): void {

  }

}
