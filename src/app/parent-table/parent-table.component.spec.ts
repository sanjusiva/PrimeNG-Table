import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../Service/data.service';


import { ParentTableComponent } from './parent-table.component';

describe('ParentTableComponent', () => {
  let component: ParentTableComponent;
  let fixture: ComponentFixture<ParentTableComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ ParentTableComponent ],
      providers:[DataService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ParentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("check order value initially",()=>{
    expect(component.order).toEqual(-1)
  })
 
  // it("check getAllData",()=>{
  //   const service=fixture.debugElement.injector.get(DataService);
  //   spyOn(service,'getAllData').and.returnValue(of([{id:1000}]));
  //   component.ngOnInit();
  //   expect(component.tables).toEqual([{id:1000}])
  // })
  it("check loadProductDB",()=>{
    let event={
      "first": 0,
      "rows": 5,
      "sortOrder": 1,
      "filters": {},
      "globalFilter": null
    };
    const service=fixture.debugElement.injector.get(DataService);
    const spy=spyOn(service,'getPage').and.returnValue(of([{id:1000}]));
    expect(spy).not.toHaveBeenCalled();
    component.loadProductDB(event);
    expect(spy).toHaveBeenCalled();
    
  })
  it("check sort operation",()=>{
    expect(component.order).toEqual(-1)
    component.sortField('name');
    expect(component.order).toEqual(1)
    component.sortField('name');
    expect(component.order).toEqual(-1)
    const service=fixture.debugElement.injector.get(DataService);
    const spy=spyOn(service,'getSort').and.returnValue(of([{id:1000}]));
    component.sortField('name')
    expect(spy).toHaveBeenCalled();
  })
  it("check toggle function",()=>{
    let param={
      "colToggle": [
        {
          "field": "name",
          "header": "Name",
          "sort": false,
          "filter": "text"
        }
      ]
    }
    const service=fixture.debugElement.injector.get(DataService);
    const spy=spyOn(service,'postColToggle').and.returnValue(of([{id:1000}]));
    component.toggleCol(param)
    expect(spy).toHaveBeenCalled();
  })

  
});
