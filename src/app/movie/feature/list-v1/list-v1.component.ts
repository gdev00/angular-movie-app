import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MovieFacadeService } from '../../data-access/movie-facade.service';
import { combineLatest, filter, finalize, map, shareReplay, skip, take, tap, withLatestFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IMovie } from 'src/app/shared/model/movie';
import { MovieApiService } from 'src/app/shared/api/movie-api.service';
import { MovieDetailComponent } from '../../ui/movie-detail/movie-detail.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonLoaderComponent } from 'src/app/shared/component/skeleton-loader/skeleton-loader.component';
import { MovieSliderComponent } from '../../ui/movie-slider/movie-slider.component';
import { MovieCarouselComponent } from '../../ui/movie-carousel/movie-carousel.component';
import { MovieStoreV1 } from '../../data-access/movie-store-v1';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetailModalComponent } from '../../ui/movie-detail-modal/movie-detail-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-v1',
  templateUrl: './list-v1.component.html',
  styleUrls: ['./list-v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovieFacadeService, MovieApiService, MovieStoreV1],
  imports: [CommonModule, RouterModule, MatDialogModule, MovieSliderComponent,
    SkeletonLoaderComponent, MovieCarouselComponent],
  standalone: true,
})
export class ListV1Component implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private movieFacadeService: MovieFacadeService) {}
  destroyRef = inject(DestroyRef);
  isLoading$ = this.movieFacadeService.isLoading$;
  watchList$ =  this.movieFacadeService.watchList$
  .pipe(
    skip(1),
    tap((watchList) => {
      this.movieFacadeService.setWatchListOnLocalStorage(watchList);
    }),
    shareReplay(1),
  );
  movieDetails$ = combineLatest([this.movieFacadeService.movieSelected$,  this.watchList$])
  .pipe(
    map(([selected, watchList]) => {
      const movie = watchList?.some(x => x.title === selected?.title);
      return !!selected ? <IMovie> { ...selected, isWatchList: !!movie }: undefined;
    }));
  movies$ = combineLatest([
    this.movieFacadeService.movies$,
    this.watchList$
  ])
  .pipe(
    map(([movies, watchList]) => {
      return <IMovie[]>movies.map(movie => {
        const isWatchList = watchList.some(watchedMovie => watchedMovie.title === movie.title);
        return {
            ...movie,
            isWatchList,
        };
    });    
    })
  );
  dialogRef: any;
 
  ngOnInit(): void {
    this.initSubscriptions();
    this.movieFacadeService.getMovies();
    this.movieFacadeService.getWatchList();
  }

  initSubscriptions(): void {
    this.route.queryParams
    .pipe(
     take(1),
     filter((query) => query['title']),
     map((query) =>query['title']  as string),
     tap((title) => {
      this.movieFacadeService.getMovie(title);
     }),
     takeUntilDestroyed(this.destroyRef)
     ).subscribe();

    combineLatest([this.route.queryParams, this.movieDetails$])
    .pipe(
      filter(([query, movie]) => !!query['title'] && !!movie),
      tap(([, movie]) => {
        this.requestMovieDetailModalShow(movie!);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  requestSortBy(by: keyof IMovie): void {
    this.movieFacadeService.sortMovies(by);
  }

  requestModifyWatchList(movie: IMovie): void {
    this.movieFacadeService.modifyWatchList(movie);
  }

  requestMovieDetailModalShow(movie: IMovie): void {
    if (this.dialogRef) {
      this.dialogRef.componentInstance.data = { movie: movie };
      return;
    } else {
      this.dialogRef = this.dialog.open(MovieDetailModalComponent, {
        data: { movie: movie }
      });
    }
   
    this.dialogRef.componentInstance.watchListAction
    .pipe(
      tap((result: IMovie) =>  this.requestModifyWatchList(result)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.dialogRef.afterClosed().pipe(
      finalize(() => this.dialogRef = undefined),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  selectMovie(movie: IMovie): void {
    this.navigateByQueryParams({ title: movie.title });
    this.movieFacadeService.selectMovie(movie);
  }

  navigateByQueryParams(query: any): void {
    this.router.navigate([], { 
      queryParams: query, 
      queryParamsHandling: 'merge'
    });
  }
}
