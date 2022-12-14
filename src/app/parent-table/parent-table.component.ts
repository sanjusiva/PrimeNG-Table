import { Component, OnInit } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DataService } from '../Service/data.service';
@Component({
  selector: 'app-parent-table',
  templateUrl: './parent-table.component.html',
  styleUrls: ['./parent-table.component.css']
})
export class ParentTableComponent implements OnInit {
  [x: string]: any;
  title='parent'
  tables: any = [];
  dataLength: any;
  constructor(private dataService: DataService) { }
  order=-1;
  config: any = [];
  colToggleArr:any[]=[];


  ngOnInit(): void {
    this.dataService.getAllData().subscribe((data: any) => {
      this.tables = data
      console.log(data);
      this.dataLength = data.length;
      // console.log("l: ",this.dataLength);
    })
    this.config =
    {
      cols: [
        { field: 'code', header: 'Code', sort: true, filter: "text" },
        { field: 'name', header: 'Name', sort: false, filter: "text" },
        { field: 'category', header: 'Category', sort: true, filter: "text" },
        { field: 'quantity', header: 'Quantity', sort: true, filter: "numeric" },
        { field: 'action', header: 'Action', sort: false, filter: "none" },
      ],
      paginationRowCount:5
    }
    console.log("configgg", this.config);

  }

  loadProductDB(event: LazyLoadEvent) {
    console.log("here load",event);

    console.log("parent: ", event.rows, event.first);
    this.dataService.getPage(event.rows, event.first).subscribe((res) => {
      console.log("res: ", res);
      this.tables = res
    })
  }
  sortField(event: any) {
    this.order=this.order*(-1)
    console.log("here sort: ", event,this.order);
    this.dataService.getSort(event,this.order).subscribe((res)=>{
      console.log("res sort: ",res);
      this.tables=res
    })
  }
  toggleCol(val:any){
    console.log("tog parent:",val);
      for(let i=0;i<val.colToggle.length;i++){
    console.log(val.colToggle[i].field);
    this.colToggleArr.push(val.colToggle[i].field)
   }
   console.log("col tog arr: ",this.colToggleArr);
   this.dataService.postColToggle(this.colToggleArr).subscribe((res:any)=>{
    console.log("col tog res: ",res);
    this.tables=res
  })
  }


}
