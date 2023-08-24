import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesDetailsComponent } from './insurances-details.component';

describe('InsurancesDetailsComponent', () => {
  let component: InsurancesDetailsComponent;
  let fixture: ComponentFixture<InsurancesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsurancesDetailsComponent]
    });
    fixture = TestBed.createComponent(InsurancesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
