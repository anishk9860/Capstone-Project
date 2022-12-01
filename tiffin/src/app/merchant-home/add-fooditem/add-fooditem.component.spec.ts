import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFooditemComponent } from './add-fooditem.component';

describe('AddFooditemComponent', () => {
  let component: AddFooditemComponent;
  let fixture: ComponentFixture<AddFooditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFooditemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFooditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
