import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import { of } from 'rxjs';
import { DataService } from '../Service/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Table3Component } from './table3.component';

describe('Table3Component', () => {
  let component: Table3Component;
  let fixture: ComponentFixture<Table3Component>;
  let confirmdialog : ConfirmDialog;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialogModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [Table3Component],
      providers: [DataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Table3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check first value', () => {
    console.log("******config: ", component.config);
    console.log("******first: ", component.first);
    expect(component.first).toEqual(0)
  })
  it('should check row value', () => {
    expect(component.row).toEqual(5)
  })
  it('emit field name', () => {
    spyOn(component.sortData, "emit").and.callThrough();
    component.sortName("name");
    expect(component.sortData.emit).toHaveBeenCalled();
  })
  it("emit toggle column value",()=>{
    let param={
      "colToggle": [
        {
          "field": "code",
          "header": "Code",
          "sort": true,
          "filter": "text"
        }
      ]
    }
    spyOn(component.toggleData,"emit").and.callThrough();
    component.multi(param);
    expect(component.toggleData.emit).toHaveBeenCalled();
  })
  it('emit pagination data',()=>{
    let param={
      "first": 0,
      "rows": 5,
      "sortOrder": 1,
      "filters": {},
      "globalFilter": null
    }
    spyOn(component.paginationData,"emit").and.callThrough();
    component.paginationLoad(param);
    expect(component.paginationData.emit).toHaveBeenCalled();
  })
  it("trigger edit product function when a edit button is clicked", async () => {
    let item = {
      "_id": "63774f8f030a9d77394a6e21",
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": "240",
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
    let res = {
      "1000": {
        "_id": "63774f8f030a9d77394a6e21",
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "image": "bamboo-watch.jpg",
        "price": 65,
        "category": "Accessories",
        "quantity": "240",
        "inventoryStatus": "INSTOCK",
        "rating": 5
      }
    }
    component.editProduct(item)
    expect(component.editProducts).toEqual(res)
  })

 
  it("save the edited values", () => {
    let param = {
      "_id": "63774f8f030a9d77394a6e21",
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": "240",
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
    const service = fixture.debugElement.injector.get(DataService);
    expect(param.quantity).toBeGreaterThan(0)
    const spy = spyOn(service, 'putData').and.returnValue(of([{ id: 1000 }]));
    component.onRowEditSave(param)
    expect(spy).toHaveBeenCalled();
  })
  it("don't save the edited values if quantity is less tan zero", () => {
    let param = {
      "_id": "63774f8f030a9d77394a6e21",
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": "-240",
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
    const service = fixture.debugElement.injector.get(DataService);
    expect(param.quantity).toBeLessThan(0)
    const spy = spyOn(service, 'putData').and.returnValue(of([{ id: 1000 }]));
    component.onRowEditSave(param)
    expect(spy).not.toHaveBeenCalled();
  })
  it("Check edit cancel function", () => {
    let product = {
      "_id": "63774f8f030a9d77394a6e21",
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": "240",
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
    component.onRowEditCancel(product, 0);
    expect(Object.keys(component.editProducts)).toEqual([])
  })
  it("delete a field in the table",()=>{
    let item={
      "_id": "63774f8f030a9d77394a6e21",
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": "240",
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
    let res={
      "_id": "637b00642d7e32b0078c7c0d",
      "id": "1005",
      "code": "av2231fwg",
      "name": "Brown Purse",
      "description": "Product Description",
      "image": "brown-purse.jpg",
      "price": 120,
      "category": "Accessories",
      "quantity": "1",
      "inventoryStatus": "OUTOFSTOCK",
      "rating": 4
    }
    component.deleteProduct(item)
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;
    let accept = spyOn(confirmdialog,"accept").and.callThrough();
    fixture.detectChanges();
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();
    expect(accept).toHaveBeenCalled();
  })



});


/* click,emit, */