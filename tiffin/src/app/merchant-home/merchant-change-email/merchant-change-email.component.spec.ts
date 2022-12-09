import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantChangeEmailComponent } from './merchant-change-email.component';

describe('MerchantChangeEmailComponent', () => {
  let component: MerchantChangeEmailComponent;
  let fixture: ComponentFixture<MerchantChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantChangeEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
