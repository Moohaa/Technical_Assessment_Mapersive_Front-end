

import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Insurance } from "../interfaces/insurance";
import { InsuranceServiceService } from "../service/insurance-service.service";

export class InsuranceDataSource implements DataSource<Insurance> {

    private insuranceSubject = new BehaviorSubject<Insurance[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private insuranceService:InsuranceServiceService) {}

    connect(collectionViewer: CollectionViewer): Observable<Insurance[]> {
        return this.insuranceSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.insuranceSubject.complete();
        this.loadingSubject.complete();
    }

    loadInsurances( filter = '',sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.insuranceService.getAllInsurances();

        this.insuranceService.findCustomers( filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => {
                this.loadingSubject.next(false);
                
            }
                )
        )
        .subscribe((insurance:any) => {
            console.log(insurance);
            this.insuranceSubject.next(insurance)
        
        }
        );
    }    
}