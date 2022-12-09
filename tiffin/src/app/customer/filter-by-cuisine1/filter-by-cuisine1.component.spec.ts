import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByCuisine1Component } from './filter-by-cuisine1.component';

describe('FilterByCuisine1Component', () => {
  let component: FilterByCuisine1Component;
  let fixture: ComponentFixture<FilterByCuisine1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByCuisine1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByCuisine1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
