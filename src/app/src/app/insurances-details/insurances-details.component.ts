import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Insurance } from '../interfaces/insurance';
import { InsuranceServiceService } from '../service/insurance-service.service';
import { Router } from '@angular/router';
import { Customer } from '../interfaces/Customer';

@Component({
  selector: 'app-insurances-details',
  templateUrl: './insurances-details.component.html',
  styleUrls: ['./insurances-details.component.scss'],
})
export class InsurancesDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private insuranceService: InsuranceServiceService,
    private router: Router
  ) {}

  insuranceDetails: Insurance[] = [];

  policy_id: string = '';
  customer_id: string = '';

  customer:Customer={
    Customer_Region:"",
    Customer_Marital_status:"",
    Customer_Income_group:"",
    Customer_Gender:""
  };

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {

      this.customer_id = params.customer_id;
      this.getInsuranceDetails(params.customer_id);
      this.getCustomer(this.customer_id);

    });
  }

  getInsuranceDetails(customer_id: string) {
    this.insuranceService
      .getInsuranceDetails(customer_id)
      .pipe(
        catchError(() => of([])),
        finalize(() => {})
      )
      .subscribe((insurance: any) => {
        this.insuranceDetails = insurance;
      });
  }
  getCustomer(customer_id:string){
    this.insuranceService
      .getCustomer(customer_id)
      .pipe(
        catchError(() => of([])),
        finalize(() => {})
      )
      .subscribe((customer: any) => {
        this.customer = customer;
      });
  }
  back() {
    this.router.navigate(['']);
  }
}
