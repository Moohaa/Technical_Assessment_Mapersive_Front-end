import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Insurance } from '../interfaces/insurance';

const BASE_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class InsuranceServiceService {
  constructor(private http: HttpClient) {}

  getAllInsurances() {
    return this.http.get<Insurance[]>(BASE_URL + '/insurances');
  }



  findCustomers(
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ) {
    return this.http
      .get(BASE_URL+'/customers',{
        params: new HttpParams()
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
          .set('customer_id', filter)

      })
      .pipe(
        map((res: any) => res["result"])
      );
  }


  getInsuranceDetails(
    customer_id:string
  ) {
    return this.http
      .get(BASE_URL+'/insurances',{
        params: new HttpParams()
          .set('customer_id', customer_id),
      })
      .pipe(
        map((res: any) => res["result"])
      );
  }

  getCustomer(
    customer_id:string
  ){
    return this.http
      .get(BASE_URL+'/customers/'+customer_id)
      .pipe(
        map((res: any) => res["result"])
      );
  }

  getCustomersCount(
  ){
    return this.http
      .get(BASE_URL+'/customersCounts')
      .pipe(
        map((res: any) => res["result"])
      );
  }

  
}
