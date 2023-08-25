import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Insurance } from '../interfaces/insurance';
import { InsuranceServiceService } from '../service/insurance-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insurances-details',
  templateUrl: './insurances-details.component.html',
  styleUrls: ['./insurances-details.component.scss']
})
export class InsurancesDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute,private insuranceService : InsuranceServiceService,private router :Router) { }


  insuranceDetails:Insurance[]=[];

  policy_id:string="";
  customer_id:string="";



  ngOnInit() {
    this.route.queryParams
      .subscribe((params: any) => {
        console.log(params);

        this.policy_id=params.policy_id;
        this.customer_id=params.customer_id;
        this.getInsuranceDetails(params.policy_id,params.customer_id);
      }
    );
  }


  getInsuranceDetails(policy_id:string,customer_id:string){
    this.insuranceService.getInsuranceDetails( policy_id,customer_id).pipe(
      catchError(() => of([])),
      finalize(() => {
          
      }
  )
  )
  .subscribe((insurance:any) => {
     this.insuranceDetails=insurance;
  
  })
  }

  back(){
    this.router.navigate([""]);
  }
}
