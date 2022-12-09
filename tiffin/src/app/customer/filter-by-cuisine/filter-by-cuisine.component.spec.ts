import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByCuisineComponent } from './filter-by-cuisine.component';

describe('FilterByCuisineComponent', () => {
  let component: FilterByCuisineComponent;
  let fixture: ComponentFixture<FilterByCuisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByCuisineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
