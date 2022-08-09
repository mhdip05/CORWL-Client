import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DesignationComponent } from './designation/designation.component';


@NgModule({
  declarations: [
    AddEmployeeComponent,
    DesignationComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }