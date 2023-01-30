import { PrimeuiSharedModule } from './_shared/primeui-shared.module';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { CustomSharedModule } from './_shared/custom-shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FooterModule,
  HeaderModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';
import { TestErrorComponent } from './views/errors/test-error/test-error.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './_redux/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    //NotFoundComponent,
    ServerErrorComponent,
    TestErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    SidebarModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    PrimeuiSharedModule,
    ProgressModule,
    HttpClientModule,
    CustomSharedModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    ModalModule.forRoot(),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      // autoPause: true,
      // features: {
      //   pause: false,
      //   lock: true,
      //   persist: true,
      // },
    }),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
