import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListV2Component } from './list-v2.component';

describe('ListV2Component', () => {
  let component: ListV2Component;
  let fixture: ComponentFixture<ListV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListV2Component]
    });
    fixture = TestBed.createComponent(ListV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
