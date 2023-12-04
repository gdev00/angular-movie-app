import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrailerModalComponent } from './movie-trailer-modal.component';

describe('MovieTrailerModalComponent', () => {
  let component: MovieTrailerModalComponent;
  let fixture: ComponentFixture<MovieTrailerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieTrailerModalComponent]
    });
    fixture = TestBed.createComponent(MovieTrailerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
