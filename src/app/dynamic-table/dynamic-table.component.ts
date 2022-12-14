import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { TablesComponent } from '../tables/tables.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DynamicTableComponent implements OnInit {

  @Input() HeadArray: any[] = [];
  @Input() GridArray: any[] = [];
  @Input() dataLength!: number
  @Input() isAction: boolean = false;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() paginate = new EventEmitter<any>();
  @Output() sorting = new EventEmitter<any>();

  // @ViewChild('loading') loadData!:TablesComponent ;
  first = 0;

  rows = 5;
  totalRecords!: number;
  paginationFirstValue: any;
  pageChange: any;
  loading!: boolean;
  @Input() booleanValue: any = false;
  clonedProducts: { [s: string]: any; } = {};
  products2: any;

  // @ViewChild('paginator', { static: true }) paginator!: Paginator

  // private updateCurrentPage(currentPage: number): void {
  //   setTimeout(() => this.paginator.changePage(currentPage));
  // }

  constructor(private cdref: ChangeDetectorRef, private messageService: MessageService,private confirmationService:ConfirmationService) { }

  ngAfterViewChecked() {
    // console.log(this.dataLength,this.GridArray); 
    this.totalRecords = this.GridArray.length
    // this.loading = this.loadData.loading
    this.cdref.detectChanges()

  }
  ngOnInit(): void {
    // console.log(this.GridArray,this.HeadArray);
    // console.log(this.dataLength);
    console.log(this.first);

  }

  editProduct(item: any) {
    this.onEdit.emit(item)
    this.clonedProducts[item.id] = { ...item };
  }

  deleteProduct(item: any) {
    console.log("del");
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDelete.emit(item);
          this.GridArray = this.GridArray.filter(val => val.id !== item.id);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
  }

  paginates(event: LazyLoadEvent) {
    console.log("lazyy: ", event);

    this.paginate.emit(event)
  }


  sortFunction(column: any, booleanValue: any) {
    console.log("col: ",column,"bool: ",booleanValue);
    
    this.sorting.emit({ column, booleanValue })
  }

  // onRowEditInit(product: any) {
  //   this.clonedProducts[product.id] = { ...product };
  // }

  onRowEditSave(product: any) {
    if (product.quantity > 0) {
      console.log("save");

      delete this.clonedProducts[product.id];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Quantity' });
    }
  }

  onRowEditCancel(product: any, index: number) {
    this.products2 = this.GridArray;
    console.log("index: ", index);
    console.log("table2: ", this.products2);
    console.log("p: ", this.products2[index])
    console.log("c: ", this.clonedProducts[product.id])
    this.products2[index] = this.clonedProducts[product.id];
    console.log("p1: ", this.products2[index])
    console.log("c1: ", this.clonedProducts[product.id])
    delete this.clonedProducts[product.id];
    console.log("lengthhhhhhhhhhh: ",this.GridArray.length);
    
  }
}
