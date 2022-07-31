import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { PlaceComponent } from './place/place.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: '',
        redirectTo: 'company'
      },
      { path: 'company', component: CompanyComponent, data: { title: 'Company' } },
      {
        path: 'branch',
        component: BranchComponent,
        data: {
          title: 'Branch'
        }
      },

      { path: 'place', component: PlaceComponent, data: { title: 'Place' } }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
