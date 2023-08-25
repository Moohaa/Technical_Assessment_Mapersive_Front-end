import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { InsuranceServiceService } from '../service/insurance-service.service';
import { InsuranceDataSource } from './InsuranceDataSource';
import {
  tap,
  merge,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  catchError,
  finalize,
  of,
} from 'rxjs';
import { Insurance } from '../interfaces/insurance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurances-table',
  templateUrl: './insurances-table.component.html',
  styleUrls: ['./insurances-table.component.scss'],
})
export class InsurancesTableComponent {
  constructor(
    private insuranceService: InsuranceServiceService,
    private router: Router
  ) {}
  dataSource: InsuranceDataSource | undefined;
  displayedColumns = [
    'Customer_id',
    'Number_Of_subscription',
    'Policies_id',
    'det',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('input') input: ElementRef | undefined;

  count: number = 55;

  ngOnInit() {
    this.dataSource = new InsuranceDataSource(this.insuranceService);
    this.dataSource.loadInsurances('', 'asc', 0, 10);
    this.getCustomerCount();
  }

  ngAfterViewInit() {
    merge('', this.paginator!.page)
        .pipe(tap(() => this.loadInsurancePage()))
        .subscribe();
    // server-side search
    fromEvent(this.input!.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator!.pageIndex = 0;
          this.loadInsurancePage();
        })
      )
      .subscribe();
  }

  loadInsurancePage() {
    this.dataSource?.loadInsurances(
      this.input!.nativeElement.value,
      '',
      this.paginator!.pageIndex,
      this.paginator!.pageSize
    );
  }

  getCustomerCount() {
    this.insuranceService
      .getCustomersCount()
      .pipe(
        catchError(() => of(55)),
        finalize(() => {})
      )
      .subscribe((count: number) => {
        this.count = count;
      });
  }

  goToDetail(insurance: Insurance) {
    this.router.navigate(['insurance'], {
      queryParams: { customer_id: insurance.Customer_id },
    });
  }
}
