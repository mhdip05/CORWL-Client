import { Component, OnInit } from '@angular/core';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeModel } from 'src/app/_models/EmployeeModel';
import { DateTimeService } from 'src/app/_services/date-time/date-time.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',

  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();
  employeeModel = new EmployeeModel();

  constructor(public dateTimeService:DateTimeService) {}

  ngOnInit(): void {}

  addJobDetails() {
    console.log(this.customModel.model);
  }
}
