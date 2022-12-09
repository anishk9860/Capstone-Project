import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChangeEmailComponent } from './customer-change-email.component';

describe('CustomerChangeEmailComponent', () => {
  let component: CustomerChangeEmailComponent;
  let fixture: ComponentFixture<CustomerChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerChangeEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
