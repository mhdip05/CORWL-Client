import { Component, Input, OnInit } from '@angular/core';
import { CustomModel } from './../../../../_models/CustomModel';
import { EmployeeModel } from './../../../../_models/EmployeeModel';
import { DateTimeService } from 'src/app/_services/date-time/date-time.service'

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {

  customModel = new CustomModel();
  employeeModel = new EmployeeModel();
  maxDate = this.dateTimeService.subTractYears(new Date(), 15);

  constructor(private dateTimeService:DateTimeService) {
  }

  ngOnInit(): void {
   
  }

  test() {
    console.log(this.customModel.model)
  }
}
