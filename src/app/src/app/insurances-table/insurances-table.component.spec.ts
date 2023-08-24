import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesTableComponent } from './insurances-table.component';

describe('InsurancesTableComponent', () => {
  let component: InsurancesTableComponent;
  let fixture: ComponentFixture<InsurancesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsurancesTableComponent]
    });
    fixture = TestBed.createComponent(InsurancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
