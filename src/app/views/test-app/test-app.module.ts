import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridTestComponent } from './grid-test/grid-test.component';
import { TestAppRoutingModule } from './test-app-routing.module';
import { PrimeuiSharedModule } from 'src/app/_shared/primeui-shared.module';

@NgModule({
  declarations: [GridTestComponent],
  imports: [CommonModule, TestAppRoutingModule, PrimeuiSharedModule],
})
export class TestAppModule {}
