import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBaseComponent } from './target-base.component';

describe('TargetBaseComponent', () => {
  let component: TargetBaseComponent;
  let fixture: ComponentFixture<TargetBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
