import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import { DynamicTableComponent } from './dynamic-table.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;
  let confirmdialog : ConfirmDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ConfirmDialogModule,
        BrowserAnimationsModule],
      declarations: [ DynamicTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emit edit products',()=>{
    let proVal={
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
    spyOn(component.onEdit,"emit").and.callThrough();
    component.editProduct(proVal);
    expect(component.onEdit.emit).toHaveBeenCalled();
   })
  it("emit delete product",()=>{
    let delItem={
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
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;
    let accept = spyOn(confirmdialog,"accept").and.callThrough();
    component.deleteProduct(delItem);
    fixture.detectChanges();
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();
    expect(accept).toHaveBeenCalled();
  })
  it("check pagination emit",()=>{
    let event={
      "first": 0,
      "rows": 5,
      "sortOrder": 1,
      "filters": {},
      "globalFilter": null
    }
    spyOn(component.paginate,"emit").and.callThrough();
    component.paginates(event)
    expect(component.paginate.emit).toHaveBeenCalled();
  })
  it("check sortFunction",()=>{
    let column='name';
    let booleanValue=false;
    spyOn(component.sorting,"emit").and.callThrough();
    component.sortFunction(column,booleanValue)
    expect(component.sorting.emit).toHaveBeenCalled();
  })
  it("check  if row edit save",()=>{
    let product={quantity:24}
    component.onRowEditSave(product)
    expect(product.quantity).toBeGreaterThan(0)
  })
  it("check else row edit save",()=>{
    let product={quantity:-1}
    component.onRowEditSave(product)
    expect(product.quantity).toBeLessThan(0)
  })
  it("check row edit cancel",()=>{
    let product={
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
    let index=0;
    component.onRowEditCancel(product,index)
    expect(index).toEqual(0);
  })
});
