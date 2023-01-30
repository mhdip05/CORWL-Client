import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyComponent } from './company/company.component';
import { BranchComponent } from './branch/branch.component';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { PrimeuiSharedModule } from 'src/app/_shared/primeui-shared.module';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CurrencyComponent } from './currency/currency.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { CompanyResolver } from 'src/app/_resolver/company.resolver';


@NgModule({
  declarations: [
    CompanyComponent,
    BranchComponent,
    BasicSettingsComponent,
    CountryComponent,
    CityComponent,
    AddCompanyComponent,
    CurrencyComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PrimeuiSharedModule,
  ],
  providers:[
    CompanyResolver
  ]
})
export class SettingsModule { }
