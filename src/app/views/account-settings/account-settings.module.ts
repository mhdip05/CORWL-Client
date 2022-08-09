import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { ParentComponent } from './parent/parent.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { CustomSharedModule } from 'src/app/_shared/custom-shared.module';


@NgModule({
  declarations: [
    ParentComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    ChangeUsernameComponent
  ],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    CustomSharedModule
  ]
})
export class AccountSettingsModule { }
