import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFoodListComponent } from './merchant-food-list.component';

describe('MerchantFoodListComponent', () => {
  let component: MerchantFoodListComponent;
  let fixture: ComponentFixture<MerchantFoodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantFoodListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
