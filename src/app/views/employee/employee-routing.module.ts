import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { UserRoleMappingComponent } from './user-role-mapping/user-role-mapping.component';

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
        path: 'user-role-map',
        component: UserRoleMappingComponent,
        data: {
          title: 'User Role Mapping',
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
