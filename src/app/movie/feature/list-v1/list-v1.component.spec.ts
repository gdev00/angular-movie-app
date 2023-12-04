import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListV1Component } from './list-v1.component';

describe('ListV1Component', () => {
  let component: ListV1Component;
  let fixture: ComponentFixture<ListV1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListV1Component]
    });
    fixture = TestBed.createComponent(ListV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
