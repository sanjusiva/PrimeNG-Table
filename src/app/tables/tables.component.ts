import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  headArray = [  
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
  { field: '' , header:'Action'}
  ]
  products: any[]=[];
  totalRecords!: number;
  virtualProducts: any;
  loading!:boolean;
  datasource: any;
  items!: any[];
  booleanValue:boolean = false;
 
  // isAction!:boolean
  constructor(private http:HttpClient,private route:Router) { }


  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.http.get<any>('assets/products.json').subscribe(
    (res:any)=>{
      this.virtualProducts = res['data'];
      this.totalRecords = res['data'].length;
      console.log(this.totalRecords)      
    })
  }


  editUser(item:any)
  {
   console.log(item);
   
  }

  delete(item:any)
  {
    console.log(item);
    console.log(this.products);
    
    // this.products = this.products.filter(val => val.id !== item.id);
    // console.log("prod: ",this.products);
    // this.totalRecords=this.totalRecords - 1;
    
  }

  
  handleClick()
  {
      this.route.navigate(['table2'])
  }

  loadProduct(event:LazyLoadEvent)
  {
    //  this.loading = true;
     console.log(event.rows,event.first,event);
     console.log("load: ",this.products);
     
    //  console.log(this.loading)
     
    // in real world scenario when the loadProduct will be called we will make a call to the real database
    //to fetch the required records
    //event.first = offset of the first row. For example in our case it will be 1 for the first page, 6 for the second page and so on.
    //event.rows = Rows to be displayed per page in the datatable. In our case it will be 5.

    setTimeout(() => {
        if (this.virtualProducts) {
          console.log(this.virtualProducts);
          // console.log(this.loading)
          this.products = this.virtualProducts.slice(event.first, (event.first!+(event.rows!)));
          console.log(this.products,event.first,event.rows);
          // this.totalRecords=
          // this.loading = false;
          console.log("ppp: ",this.products);
          
        }
    }, 1000);
  }

  sortFunction(event:any) {
    console.log("hwelo",event);
    console.log("whole before products: ",this.products);
    
    if (event.booleanValue=== true){//descending
        console.log('ok');
       
        this.items = this.products;    
        console.log("item sort before: ",this,this.products);
        
        this.items.sort((a:any, b:any) => {
          // console.log(a,"event",event.column) 
          return a[event.column] < b[event.column] ? 1 : a[event.column] > b[event.column] ? -1 : 0})
        console.log("item sort after: ",this,this.products);
        this.booleanValue = !this.booleanValue
        console.log("booooolean: ",this.booleanValue);
        
    }
    else{//ascending
      console.log(this.booleanValue);
        this.products.sort((a:any, b:any) => a[event.column] > b[event.column] ? 1 : a[event.column] < b[event.column] ? -1 : 0)
        this.booleanValue = !this.booleanValue
    }
}
  

}
