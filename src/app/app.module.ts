import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { TablesComponent } from './tables/tables.component';
import {TableModule,} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Table2Component } from './table2/table2.component';
import { DynamicTable2Component } from './dynamic-table2/dynamic-table2.component';
import { CommonPipe } from './dynamic-table2/common.pipe';
import {PaginatorModule} from 'primeng/paginator';
import {ConfirmDialogModule} from 'primeng/confirmdialog'
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { Table3Component } from './table3/table3.component';
import { ParentTableComponent } from './parent-table/parent-table.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DynamicTableComponent,
    TablesComponent,
    Table2Component,
    DynamicTable2Component,
    CommonPipe,
    Table3Component,
    ParentTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginatorModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
