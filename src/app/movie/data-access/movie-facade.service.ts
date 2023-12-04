import { DestroyRef, Injectable, inject } from '@angular/core';
import { MovieApiService } from 'src/app/shared/api/movie-api.service';
import { MovieState } from './movie-state';
import { map, take, tap } from 'rxjs';
import { IMovie, LocalStorageKey } from 'src/app/shared/model/movie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageUtil } from '../utils/local-storage.util';

@Injectable()
export class MovieFacadeService {
  constructor(private movieApiService: MovieApiService, private movieState: MovieState)  { }
  destroyRef = inject(DestroyRef);
  movieSelected$ = this.movieState.movieSelected$;
  movies$ = this.movieState.movies$;
  watchList$ = this.movieState.watchList$;

  getWatchListOnLocalStorage(): IMovie[] {
    return LocalStorageUtil.getItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST) || [];
  }

  setWatchListOnLocalStorage(item: IMovie[]): void {
    return LocalStorageUtil.setItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST, item);
  }

  getMovies(): void {
    // Example of using direct api call without using switchMap etc.
    // Alternative use an effect under ngRX.
    this.movieApiService.getMovies().pipe(
      tap((data) => this.movieState.setMovies(data)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  getMovie(title: string): void {
    this.movieApiService.getMovie(title).pipe(
      tap((data) => this.movieState.setSelectedMovie(data)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  getWatchList(): void {
    this.movieState.setWatchList(this.getWatchListOnLocalStorage());
  }

  sortMovies(by: keyof IMovie): void {
    this.movies$.pipe(
      take(1),
      map((movies) => {
          return movies.slice().sort((a, b) => {
            const propA = a[by] ?? '';
            const propB = b[by] ?? '';

            return propA < propB ? -1 : propA > propB ? 1 : 0;
          });
      }),
      tap((data) => this.movieState.setMovies(data)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  modifyWatchList(movie: IMovie): void {
    this.watchList$.pipe(
      take(1),
      tap((movies) => {
        if(movies.some(m => m.title === movie.title)) {
          this.movieState.removeToWatchList(movie);
        } else {
          this.movieState.addToWatchList(movie);
        }
    }),
    takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  selectMovie(movie: IMovie): void {
    this.movieState.setSelectedMovie(movie);
  }
}
