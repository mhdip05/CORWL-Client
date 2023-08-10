import { ResetPasswordComponent } from './views/authentication/reset-password/reset-password.component';
import { AuthGuard } from './_guards/auth.guard';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/authentication/login/login.component';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';
import { TestErrorComponent } from './views/errors/test-error/test-error.component';
import { ForgotPasswordComponent } from './views/authentication/forgot-password/forgot-password.component';
import { ChooseRoleComponent } from './views/choose-role/choose-role.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login',
    },

    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./views/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

  {
    path: 'choose-role',
    component: ChooseRoleComponent,
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./views/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },

      {
        path: 'employee',
        loadChildren: () =>
          import('./views/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./views/doctor/doctor.module').then((m) => m.DoctorModule),
      },
      {
        path: 'account-settings',
        loadChildren: () =>
          import('./views/account-settings/account-settings.module').then(
            (m) => m.AccountSettingsModule
          ),
      },
      {
        path: 'test-app',
        loadChildren: () =>
          import('./views/test-app/test-app.module').then(
            (m) => m.TestAppModule
          ),
      },
    ],
  },

  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
