import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { DynamicTable2Component } from './dynamic-table2.component';

describe('DynamicTable2Component', () => {
  let component: DynamicTable2Component;
  let fixture: ComponentFixture<DynamicTable2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTable2Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Async test example with Jasmine done', (done: DoneFn) => {
    let test = false;
    console.log("out: ", test);//false
    setTimeout(() => {
      test = true;
      console.log("in 1: ", test);//true
      expect(test).toBeTruthy();
      console.log("in 2: ", test);//true
      done();
      console.log("in 3: ", test);//true
    }, 1000);
  });
  it('Async test example - setTimeout()', fakeAsync(() => {
    let test = false;
    console.log('Running the assertions');
    setTimeout(() => {
      test = true;
      console.log('Running the assertions inside setTimeout()');
      expect(test).toBeTruthy();
    }, 1000);
    // expect(test).toBeTruthy();//Expected false to be truthy.

    tick(1000);
    //tick(100)//throws error
  }));
  it('Async test example - setTimeout() with flush()', fakeAsync(() => {
    let test = false;
    // setTimeout(() => {});
    setTimeout(() => {
        test = true;
        expect(test).toBeTruthy();
    }, 1000);
console.log("ttteeesssttt: ",test);//before flush:false
    flush();
    expect(test).toBeTruthy();
console.log("ttteeesssttt1: ",test);//after flush:true

}));
});
