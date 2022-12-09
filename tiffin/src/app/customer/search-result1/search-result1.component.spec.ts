import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResult1Component } from './search-result1.component';

describe('SearchResult1Component', () => {
  let component: SearchResult1Component;
  let fixture: ComponentFixture<SearchResult1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResult1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResult1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
