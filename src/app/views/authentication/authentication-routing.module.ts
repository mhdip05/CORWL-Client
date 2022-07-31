import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Auth'
    },
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'Forgot-passowrd' }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
