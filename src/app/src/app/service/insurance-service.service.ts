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



  findInsurance(
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ) {
    return this.http
      .get(BASE_URL+'/insurances',{
        params: new HttpParams()
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(
        map((res: any) => res["result"])
      );
  }
}
