import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { CustomSharedModule } from '../../_shared/custom-shared.module'
import { DisplayErrorComponent } from 'src/app/modals/display-error/display-error.component';


@NgModule({
  declarations: [
    LoginComponent,
    DisplayErrorComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CustomSharedModule,
  ],
})
export class AuthenticationModule { }
