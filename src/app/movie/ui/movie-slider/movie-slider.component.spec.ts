import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSliderComponent } from './movie-slider.component';

describe('MovieSliderComponent', () => {
  let component: MovieSliderComponent;
  let fixture: ComponentFixture<MovieSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSliderComponent]
    });
    fixture = TestBed.createComponent(MovieSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
