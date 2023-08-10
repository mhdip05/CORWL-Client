import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: "Doctor"
    },
    children: [
      {
        path:'',
        redirectTo:'appointment-list'
      },
      {
        path: 'appointment-list',
        component: AppointmentListComponent,
        data: {
          title: "Appointment-List"
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
