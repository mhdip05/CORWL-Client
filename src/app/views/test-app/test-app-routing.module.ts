import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridTestComponent } from './grid-test/grid-test.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Test-App'
    },
    children: [
      {
        path: '',
        redirectTo: 'grid-test'
      },
      { path: 'grid-test', component: GridTestComponent, data: { title: 'Grid-Test' }},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})

export class TestAppRoutingModule { }
