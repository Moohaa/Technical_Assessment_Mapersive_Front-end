import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Insurance } from '../interfaces/insurance';
import { InsuranceServiceService } from '../service/insurance-service.service';
import { Router } from '@angular/router';
import { Customer } from '../interfaces/Customer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-insurances-details',
  templateUrl: './insurances-details.component.html',
  styleUrls: ['./insurances-details.component.scss'],
})
export class InsurancesDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Policy_id', 'Date_of_Purchase', 'Fuel', 'comprehensive','property_damage_liability','personal_injury_protection','bodily_injury_liability'
                 ,'VEHICLE_SEGMENT','Premium'];
  dataSource: MatTableDataSource<Insurance> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  
  constructor(
    private route: ActivatedRoute,
    private insuranceService: InsuranceServiceService,
    private router: Router
  ) {}


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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }

  getInsuranceDetails(customer_id: string) {
    this.insuranceService
      .getInsuranceDetails(customer_id)
      .pipe(
        catchError(() => of([])),
        finalize(() => {})
      )
      .subscribe((insurance: any) => {
        this.dataSource= new MatTableDataSource(insurance);
        this.dataSource!.paginator = this.paginator!;
         this.dataSource!.sort = this.sort!;
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
