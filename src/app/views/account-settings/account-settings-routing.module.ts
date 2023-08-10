import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  {
    path: '',
    // data: {
    //   title:'Account Settings'
    // },
    children:[
      {
         path: '',
         redirectTo: 'parent'
      },

      {
        path:'parent',
        component: ParentComponent,
        data: {title : 'Account Settings'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
