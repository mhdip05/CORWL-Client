import { DoctorRoutingModule } from './doctor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';



@NgModule({
  declarations: [
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
