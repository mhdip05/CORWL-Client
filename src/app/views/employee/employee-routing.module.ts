import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { UserListComponent } from './user-list/user-list-component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employee',
    },
    children: [
      {
        path: '',
        redirectTo: 'employee-settings',
      },
      {
        path: 'employee-settings',
        component: EmployeeSettingsComponent,
        data: {
          title: 'Employee-Settings',
        },
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
        data: {
          title: 'Add-Empoloyee',
        },
      },
      {
        path: 'edit-employee/:id',
        component: AddEmployeeComponent,
        data: {
          title: 'Edit-Employee',
        },
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        data: {
          title: 'Employee-list',
        },
      },
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'User List',
        },
      },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
