import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChartComponent } from './report-chart.component';

describe('ReportChartComponent', () => {
  let component: ReportChartComponent;
  let fixture: ComponentFixture<ReportChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportChartComponent]
    });
    fixture = TestBed.createComponent(ReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
