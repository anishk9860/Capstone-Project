import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantChangePasswordComponent } from './merchant-change-password.component';

describe('MerchantChangePasswordComponent', () => {
  let component: MerchantChangePasswordComponent;
  let fixture: ComponentFixture<MerchantChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
