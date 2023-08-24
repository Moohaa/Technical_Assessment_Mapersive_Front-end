import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsurancesTableComponent } from './src/app/insurances-table/insurances-table.component';
import { InsurancesDetailsComponent } from './src/app/insurances-details/insurances-details.component';

@NgModule({
  declarations: [
    AppComponent,
    InsurancesTableComponent,
    InsurancesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
