import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesTableComponent } from './src/app/insurances-table/insurances-table.component';

const routes: Routes = [
  { path: '', component: InsurancesTableComponent },
  { path: 'insurance/:id', component: InsurancesTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
