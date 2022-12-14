import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  readonly baseURL = "http://localhost:3000/"
  getAllData() {
    console.log("service");
    return this.http.get(this.baseURL);
  }
  putData(item: any) {
    return this.http.put(this.baseURL, item)
  }
  deleteData(item: any) {
    console.log(item._id);
    return this.http.delete(this.baseURL + `${item._id}`)
  }
  getPage(first: any, row: any) {
    return this.http.get(this.baseURL + 'page' + `/${first}` + `/${row}`)
  }
  getSort(field: any, order: any) {
    return this.http.get(this.baseURL + 'sort' + `/${field}` + `/${order}`)
  }
  postColToggle(toggleArr: any) {
    return this.http.post(this.baseURL + 'col', { arr: toggleArr })
  }
}
