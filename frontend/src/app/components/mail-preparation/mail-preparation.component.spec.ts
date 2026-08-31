import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailPreparationComponent } from './mail-preparation.component';

describe('MailPreparationComponent', () => {
  let component: MailPreparationComponent;
  let fixture: ComponentFixture<MailPreparationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailPreparationComponent]
    });
    fixture = TestBed.createComponent(MailPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
