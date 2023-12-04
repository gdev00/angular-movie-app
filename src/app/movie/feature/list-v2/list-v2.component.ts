import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, computed, effect, inject } from '@angular/core';
import { MovieDetailComponent } from '../../ui/movie-detail/movie-detail.component';
import { MovieStoreV2 } from '../../data-access/movie-store-v2';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieApiService } from 'src/app/shared/api/movie-api.service';
import { concatMap, delay, of, tap } from 'rxjs';
import { IMovie, LocalStorageKey } from 'src/app/shared/model/movie';
import { LocalStorageUtil } from '../../utils/local-storage.util';
import { MovieSliderComponent } from '../../ui/movie-slider/movie-slider.component';
import { SkeletonLoaderComponent } from 'src/app/shared/component/skeleton-loader/skeleton-loader.component';
import { MovieCarouselComponent } from '../../ui/movie-carousel/movie-carousel.component';


@Component({
  selector: 'app-list-v2',
  templateUrl: './list-v2.component.html',
  styleUrls: ['./list-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MovieDetailComponent, MovieSliderComponent,
    SkeletonLoaderComponent, MovieCarouselComponent],
  standalone: true,
})
export class ListV2Component implements OnInit {
  constructor(
    private injector: Injector,
    private movieApiService: MovieApiService,
    private movieStoreV2: MovieStoreV2) {}
    destroyRef = inject(DestroyRef);
    isLoading = computed(() => this.movieStoreV2.isLoading());
    watchList = computed(() => {
      const data = this.movieStoreV2.watchList();
      return Array.from(data.values());
    });
    movies = computed(() => {
      const movies = this.movieStoreV2.movies();
      const sortBy = this.movieStoreV2.sortBy();
      const watchList = this.watchList();

      const newMovies = movies.map(movie => {
        const isWatchList = watchList.some(watchedMovie => watchedMovie.title === movie.title);
        return { ...movie, isWatchList,
      }});

      if (!sortBy) return newMovies;
      return newMovies.slice().sort((a, b) => {
        const propA = a[sortBy] ?? '';
        const propB = b[sortBy] ?? '';

        return propA < propB ? -1 : propA > propB ? 1 : 0;
      });
    });

    ngOnInit(): void {
      this.getMovies();
      this.getWatchList();
      this.initEffects();
    }

    requestSortBy(by: keyof IMovie | undefined): void {
      this.movieStoreV2.setSortBy(by);
    }

    requestModifyWatchList(movie: IMovie): void {
      if(this.watchList().some(m => m.title === movie.title)) {
        this.movieStoreV2.removeToWatchList(movie);
      } else {
        this.movieStoreV2.addToWatchList({...movie, isWatchList: true});
      }
    }

    selectMovie(movie: IMovie): void {
      this.movieStoreV2.setSelectedMovie(movie);
    }
  
    private initEffects(): void {
      effect(() => {
        this.setWatchListOnLocalStorage(this.watchList());
      }, { injector: this.injector});
    }  

    private getWatchList(): void {
      this.movieStoreV2.setWatchList(this.getWatchListOnLocalStorage());
    }

    private getMovies(): void {
      // Example of using 'of(null)' to execute the api inside of concatMap, switchMap, mergeMap, exhaustMap.
      of(null).pipe(
        tap(() => this.movieStoreV2.setLoading(true)),
        delay(2000),
        concatMap(() => {
          return  this.movieApiService.getMovies();
        }),
        tap((data) => {
          this.movieStoreV2.setMovies(data);
          this.movieStoreV2.setLoading(false)
        }),
        takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }

    private getWatchListOnLocalStorage(): IMovie[] {
      return LocalStorageUtil.getItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST) || [];
    }
  
    private setWatchListOnLocalStorage(item: IMovie[]): void {
      return LocalStorageUtil.setItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST, item);
    }
}
