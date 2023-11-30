import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyResolver } from 'src/app/_resolver/company.resolver';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { BranchComponent } from './branch/branch.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompanyComponent } from './company/company.component';
//import { PlaceComponent } from './place/place.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Settings',
    },
    children: [
      {
        path: '',
        redirectTo: 'basic-settings',
        pathMatch: 'full'
      },
      {
        path: 'basic-settings',
        component: BasicSettingsComponent,
        data: { title: 'Basic-Settings' },
      },
      {
        path: 'company',
        component: CompanyComponent,
        data: { title: 'Company-List' },
      },
      {
        path: 'add-company',
        component: AddCompanyComponent,
        data: { title: 'Add-Company' },
      },
      {
        path: 'edit-company/:id',
        component: AddCompanyComponent,
        data: { title: 'Edit-Company' },
      },
      {
        path: 'branch',
        component: BranchComponent,
        data: { title: 'Branch-List' },
      },
      {
        path: 'add-branch',
        component: AddBranchComponent,
        data: { title: 'Add-Branch' },
      },
      {
        path: 'edit-branch/:id',
        component: AddBranchComponent,
        data: { title: 'Edit-Branch' },
      },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
