import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DesignationComponent } from './designation/designation.component';
import { UserRoleMappingComponent } from './user-role-mapping/user-role-mapping.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: "Employee"
    },
    children: [
      {
        path:'',
        redirectTo:'add-employee'
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
        data: {
          title: "Add-Empoloyee"
        }
      },
      {
        path: 'designation',
        component: DesignationComponent,
        data: {
          title: "Add-Designation"
        }
      },
      {
        path: 'user-role-map',
        component: UserRoleMappingComponent,
        data: {
          title: "User Role Mapping"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
