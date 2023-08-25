import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { InsuranceServiceService } from '../service/insurance-service.service';
import { InsuranceDataSource } from './InsuranceDataSource';
import {  tap, merge } from 'rxjs';


@Component({
  selector: 'app-insurances-table',
  templateUrl: './insurances-table.component.html',
  styleUrls: ['./insurances-table.component.scss'],
})
export class InsurancesTableComponent {
  
  constructor(private insuranceService:InsuranceServiceService){
    
  }
  dataSource: InsuranceDataSource | undefined;
  displayedColumns= ["Policy_id","Customer_id","Customer_Region"];

    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    @ViewChild(MatSort) sort: MatSort | undefined;
    @ViewChild('input') input: ElementRef | undefined;

    
    ngOnInit() {
        this.dataSource = new InsuranceDataSource(this.insuranceService);
        this.dataSource.loadInsurances('', 'asc', 0, 10);
        console.log(this.dataSource);
    }

    ngAfterViewInit() {
        
      // reset the paginator after sorting
      //this.sort!.sortChange.subscribe(() => this.paginator!.pageIndex = 0);
      
      merge('', this.paginator!.page)
          .pipe(
              tap(() => this.loadInsurancePage())
          )
          .subscribe();
  }

    loadInsurancePage() {
        this.dataSource?.loadInsurances(
            '',
            '',
            this.paginator!.pageIndex,
            this.paginator!.pageSize);
    }



}