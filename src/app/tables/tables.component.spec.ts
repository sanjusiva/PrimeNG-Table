import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TablesComponent } from './tables.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [TablesComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("button click to navigate", () => {
    component.handleClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['table2'])
  });
  it("check setTimeout operation", (done) => {
    let event = {
      "first": 0,
      "rows": 5,
      "sortOrder": 1,
      "filters": {},
      "globalFilter": null
    }
    let res=[
      {
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
      },
      {
          "id": "1001",
          "code": "nvklal433",
          "name": "Black Watch",
          "description": "Product Description",
          "image": "black-watch.jpg",
          "price": 72,
          "category": "Accessories",
          "quantity": 61,
          "inventoryStatus": "INSTOCK",
          "rating": 4
      },
      {
          "id": "1002",
          "code": "zz21cz3c1",
          "name": "Blue Band",
          "description": "Product Description",
          "image": "blue-band.jpg",
          "price": 79,
          "category": "Fitness",
          "quantity": 2,
          "inventoryStatus": "LOWSTOCK",
          "rating": 3
      },
      {
          "id": "1003",
          "code": "244wgerg2",
          "name": "Blue T-Shirt",
          "description": "Product Description",
          "image": "blue-t-shirt.jpg",
          "price": 29,
          "category": "Clothing",
          "quantity": 25,
          "inventoryStatus": "INSTOCK",
          "rating": 5
      },
      {
          "id": "1004",
          "code": "h456wer53",
          "name": "Bracelet",
          "description": "Product Description",
          "image": "bracelet.jpg",
          "price": 15,
          "category": "Accessories",
          "quantity": 73,
          "inventoryStatus": "INSTOCK",
          "rating": 4
      }
  ]
    component.loadProduct(event);
    console.log("$$$$$$$$$$$$$$before: ",component.products);

    setTimeout(()=>{
      console.log("$$$$$$$$$$$$$$after: ",component.products);
      
      expect(component.products).toEqual(res);
      done();
    },1001)
  })
  it("check if sortFunction",()=>{
    let event={
      "column": "name",
      "booleanValue": true
    }
    component.sortFunction(event)
    console.log("%%%%%%%%%%%%%: ",component.booleanValue);
    expect(component.booleanValue).toBeTrue();
    
  })
  it("check else sortFunction",()=>{
    let event={
      "column": "name",
      "booleanValue": false
    }
    component.sortFunction(event)
    console.log("%%%%%%%%%%%%%else: ",component.booleanValue);
    expect(event.booleanValue).toBeFalse();
    
  })
});
