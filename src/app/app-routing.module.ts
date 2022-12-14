import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { ParentTableComponent } from './parent-table/parent-table.component';
import { Table2Component } from './table2/table2.component';
import { Table3Component } from './table3/table3.component';
import { TablesComponent } from './tables/tables.component';

export const routes: Routes = [
  {
    path:'',
    component: TablesComponent,
    pathMatch:'full'
  },
  {
    path:'table2',
    component:Table2Component
  },
  // {
  //   path:'table3',
  //   component:Table3Component
  // },
  {
    path:'parent',
    component:ParentTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ { provide: LocationStrategy, useClass: PathLocationStrategy } ]
})
export class AppRoutingModule { }
