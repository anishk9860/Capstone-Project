import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFooditemComponent } from './edit-fooditem.component';

describe('EditFooditemComponent', () => {
  let component: EditFooditemComponent;
  let fixture: ComponentFixture<EditFooditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFooditemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFooditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
