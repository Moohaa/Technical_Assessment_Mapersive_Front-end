import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesDetailsComponent } from './src/app/insurances-details/insurances-details.component';
import { InsurancesTableComponent } from './src/app/insurances-table/insurances-table.component';

const routes: Routes = [
  { path: '', component: InsurancesTableComponent },
  { path: 'insurance',
   component: InsurancesDetailsComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
