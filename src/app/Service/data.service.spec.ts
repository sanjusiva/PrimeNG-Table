// import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { DataService } from './data.service';
// import { HttpClient } from '@angular/common/http';
// import { asyncData } from '../testing/asyncHelpers'
// import { Data } from '../modal/data'
// describe('DataService', () => {
//   let service: DataService;
//   let httpClientSpy: jasmine.SpyObj<HttpClient>;
//   let httpMock: HttpTestingController;
//   let injector: TestBed;
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [HttpClientTestingModule],
//     providers: [DataService]
//   }));

//   beforeEach(() => {
//     // TestBed.configureTestingModule({});
//     // service = TestBed.inject(DataService);
//     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);

//     injector = getTestBed();
//     service = injector.get(DataService);
//     httpMock = injector.get(HttpTestingController);

//   });
//   afterEach(() => {
//     httpMock.verify();
//   });  

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//   it('check getAllData', () => {
//     let ans = [
//       {
//         "_id": "63774f8f030a9d77394a6e21",
//         "id": "1000",
//         "code": "f230fh0g3",
//         "name": "Bamboo Watch",
//         "description": "Product Description",
//         "image": "bamboo-watch.jpg",
//         "price": 65,
//         "category": "Accessories",
//         "quantity": "240",
//         "inventoryStatus": "INSTOCK",
//         "rating": 5
//       }
//     ]

//     httpClientSpy.get.and.returnValue(asyncData(ans));

//     service.getAllData().subscribe({
//       next: (res) => {
//         expect(res)
//           .withContext('expected data')
//           .toEqual(ans)
//           console.log("sdxfcvgbh: ",res);

//       },
//     });

//     const req = httpMock.expectOne(`http://localhost:3000/`);
//     expect(req.request.method).toBe('GET');
//     expect(req.request.responseType).toBe('json');

//   })
//   xit('check get page', () => {
//     let first = 0;
//     let row = 5;
//     let order = -1;
//     let resSort: Data[] = [
//       {
//         "_id": "63774f8f030a9d77394a6e21",
//         "id": "1000",
//         "code": "f230fh0g3",
//         "name": "Bamboo Watch",
//         "description": "Product Description",
//         "image": "bamboo-watch.jpg",
//         "price": 65,
//         "category": "Accessories",
//         "quantity": "240",
//         "inventoryStatus": "INSTOCK",
//         "rating": 5
//       }
//     ]
//     httpClientSpy.get.and.returnValue(asyncData(resSort));
//     service.getSort(first, order).subscribe({
//       next: res => {
//         expect(res)
//           .withContext('expected data')
//           .toEqual(resSort);
//       },
//     });
//     service.getPage(first, row).subscribe({
//       next: res => {
//         expect(res.hasOwnProperty.length)
//           .withContext('expected data')
//           .toEqual(resSort.length);
//       },
//     });
//     const req = httpMock.expectOne(`http://localhost:3000/page/${first}/${row}`);
//     expect(req.request.method).toBe('GET');
//     const req1 = httpMock.expectOne(`http://localhost:3000/sort/${first}/${order}`);
//     expect(req1.request.method).toBe('GET');
//   })
//   xit("check put method", () => {
//     let item = {
//       "_id": "63774f8f030a9d77394a6e21",
//       "id": "1000",
//       "code": "f230fh0g3",
//       "name": "Bamboo Watch",
//       "description": "Product Description",
//       "image": "bamboo-watch.jpg",
//       "price": 65,
//       "category": "Accessories",
//       "quantity": "240",
//       "inventoryStatus": "INSTOCK",
//       "rating": 5
//     }
//     service.putData(item).subscribe({
//       next: res => {
//         expect(res)
//           .withContext('expected data')
//           .toEqual(item);
//       }
//     })
//     const req = httpMock.expectOne(`http://localhost:3000/`);
//     expect(req.request.method).toBe('PUT');

//   })


// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Data } from '../modal/data'
import { of } from 'rxjs';
describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let ans = [
    {
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
  ]
  let resSort: Data[] = [
    {
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
  ]
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
          "rating": 50
        }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataService]
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    service = TestBed.inject(DataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('check getAllData', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(ans));
    service.getAllData().subscribe({
      next: (res) => {
        expect(res).toEqual(ans);
        console.log("results: ", res);

        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
  it('check getPage', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(resSort));
    service.getSort(0, -1).subscribe({
      next: (res) => {
        expect(res).toEqual(resSort);
        done();
      },
    });
    // service.getPage(0, 5).subscribe({
    //   next: (res) => {
    //     expect(res.hasOwnProperty.length).toEqual(resSort.length);
    //     done();
    //   },
    // });
  })
  it('check getSort', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(resSort));

    service.getPage(0, 5).subscribe({
      next: (res) => {
        expect(res.hasOwnProperty.length).toEqual(resSort.length);
        console.log("length: ",resSort.length,res.hasOwnProperty.length);
        done();
      },
    });
  })
  it('check putData', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(of(item));

    service.putData(item).subscribe({
      next: (res) => {
        expect(res).toEqual(item);
        console.log("put length: ",item,res);
        done();
      },
    });
  })

})


