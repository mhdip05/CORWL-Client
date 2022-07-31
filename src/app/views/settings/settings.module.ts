import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyComponent } from './company/company.component';
import { BranchComponent } from './branch/branch.component';
import { PlaceComponent } from './place/place.component';


@NgModule({
  declarations: [
    CompanyComponent,
    BranchComponent,
    PlaceComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
