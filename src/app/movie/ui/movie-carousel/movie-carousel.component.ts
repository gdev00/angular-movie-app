import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Injector, Input, OnInit, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { IMovie } from 'src/app/shared/model/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, CarouselModule, MovieCardComponent, DropdownModule,
    MatFormFieldModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class MovieCarouselComponent implements OnInit {
  @Input() movies: IMovie[] = [];
  @Output() sortByAction = new EventEmitter<keyof IMovie>();
  @Output() watchListAction = new EventEmitter<IMovie>();
  @Output() selected = new EventEmitter<IMovie>();
  destroyRef = inject(DestroyRef);
  formControl = new FormControl<string | null | undefined>(null);
  options = [
    {
      name: 'Title',
      value: 'title'
    },
    {
      name: 'Release Date',
      value: 'releaseDate'
    },
  ]
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      filter((x) => !!x),
      tap((result) => {
        this.sortByAction.emit(result as keyof IMovie);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  requestUpdateWatchList(movie: IMovie): void {
    this.watchListAction.emit(movie);
  }

  selectMovie(movie: IMovie): void {
    this.selected.emit(movie);
  }
}
