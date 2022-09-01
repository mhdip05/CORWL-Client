import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DefaultGridComponent } from '../views/grid/default-grid/default-grid.component';


@NgModule({
  declarations: [
    DefaultGridComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
  ],
  exports: [
    ButtonModule,
    TableModule,
    PaginatorModule,
    DefaultGridComponent
  ]
})
export class PrimeuiSharedModule { }
