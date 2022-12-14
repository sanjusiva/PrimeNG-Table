import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class Table3Component implements OnInit {

  cols: any[] = [];
  tables: any = [];
  table2: any
  editProducts: { [s: string]: any; } = {};
  first=0;
  row=5;
  dataLength:any;
  rowCount:any;
  selectedColumns:any[]=[]
  tableform!: FormGroup ;
  colToggleArr:any[]=[];
  @Input() config: any = []
  @Input() tableArray: any = []
  @Input() DataLength: any = []
  @Output() paginationData = new EventEmitter<any>();
  @Output() sortData = new EventEmitter<any>();
  @Output() toggleData = new EventEmitter<any>();

  
  constructor(private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService,private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.tableform = this.fb.group({
      'colToggle': new FormControl('',)
  });
    // this.dataService.getAllData().subscribe((data: any) => {
    //   this.tables = data
    //   console.log(data);
     
      console.log("l: ",this.dataLength);
      


      // for(let j=0;j<Object.keys(this.tables[0]).length;j++){
      //   if(Object.keys(this.tables[j])[j][0]!='_')
      //   this.cols.push(Object.keys(this.tables[j])[j])
      //   console.log("c: ",this.cols); 
      // }

      // this.cols = [
      //   { field: 'code', header: 'Code', sort: true, filter: "text" },
      //   { field: 'name', header: 'Name', sort: false, filter: "text" },
      //   { field: 'category', header: 'Category', sort: true, filter: "text" },
      //   { field: 'quantity', header: 'Quantity', sort: true, filter: "numeric" },
      //   { field: 'action', header: 'Action', sort: false, filter: "none" },
      // ];
      this.cols = this.config.cols;
      // this.cols.forEach((i:any)=>{
      //   this.selectedColumns.push(i.field)
      // })
      this.selectedColumns=this.cols
      this.rowCount=this.config.paginationRowCount
      console.log("this.config ", this.config);
    // })
    console.log("selectedCols: ",this.selectedColumns);
    
  }
  editProduct(item: any) {
    console.log("item: ", item);
    this.editProducts[item.id] = { ...item };

  }
  onRowEditSave(product: any) {
    console.log("dd: ", product);

    if (product.quantity > 0) {
      console.log("save");
      this.dataService.putData(product).subscribe((res: any) => {
        console.log("put res: ", res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      })
      // delete this.editProducts[product.id];
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Quantity' });
    }
  }
  onRowEditCancel(product: any, index: number) {
    this.table2 = this.tables;
    console.log("tables: ", this.table2);
    this.table2[index] = this.editProducts[product.id];
    delete this.editProducts[product.id];
  }
  deleteProduct(item: any) {
    console.log("del",item);

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteData(item).subscribe((res: any) => {
          console.log("del res: ", res);

        })
        // this.tables = this.tables.filter((val:any) => val.id !== item.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }
  paginationLoad(event: LazyLoadEvent) {
    console.log("lazyy t3: ", event);

    this.paginationData.emit(event)
  }

  sortName(field:any){
    console.log("sort: ",field);
    this.sortData.emit(field)
  }

  multi(val:any){
    console.log("mv: ",val);
   console.log("val: ",val.colToggle.length);
   this.cols=val.colToggle
   this.toggleData.emit(val)
  //  for(let i=0;i<val.colToggle.length;i++){
  //   console.log(val.colToggle[i].field);
  //   this.colToggleArr.push(val.colToggle[i].field)
  //  }
  //  console.log("col tog arr: ",this.colToggleArr);
  //  this.dataService.postColToggle(this.colToggleArr).subscribe((res:any)=>{
  //   console.log("col tog res: ",res);
  // })
  }
}
