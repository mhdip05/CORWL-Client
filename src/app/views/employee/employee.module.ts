import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DesignationComponent } from './designation/designation.component';
import { UserRoleMappingComponent } from './user-role-mapping/user-role-mapping.component';
import { PrimeuiSharedModule } from 'src/app/_shared/primeui-shared.module';


@NgModule({
  declarations: [
    AddEmployeeComponent,
    DesignationComponent,
    UserRoleMappingComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    PrimeuiSharedModule
  ]
})
export class EmployeeModule { }
