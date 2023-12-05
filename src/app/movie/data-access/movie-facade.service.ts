import { DestroyRef, Injectable, inject } from '@angular/core';
import { MovieApiService } from 'src/app/shared/api/movie-api.service';
import { MovieStoreV1 } from './movie-store-v1';
import { delay, map, of, switchMap, take, tap } from 'rxjs';
import { IMovie, LocalStorageKey } from 'src/app/shared/model/movie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageUtil } from '../utils/local-storage.util';

@Injectable()
export class MovieFacadeService {
  constructor(private movieApiService: MovieApiService, private moveStoreV1: MovieStoreV1)  { }
  destroyRef = inject(DestroyRef);
  movieSelected$ = this.moveStoreV1.movieSelected$;
  movies$ = this.moveStoreV1.movies$;
  watchList$ = this.moveStoreV1.watchList$;
  isLoading$ = this.moveStoreV1.isLoading$;

  getWatchListOnLocalStorage(): IMovie[] {
    return LocalStorageUtil.getItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST) || [];
  }

  setWatchListOnLocalStorage(item: IMovie[]): void {
    return LocalStorageUtil.setItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST, item);
  }

  getMovies(): void {
    of(null)
    .pipe(
      tap(() => this.moveStoreV1.setLoading(true)),
      delay(2000),
      switchMap(() => this.movieApiService.getMovies()),
      tap((data) => this.moveStoreV1.setMovies(data)),
      tap(() => this.moveStoreV1.setLoading(false)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  getMovie(title: string): void {
     // Example of using direct api call without using switchMap etc.
    // Alternative use an effect under ngRX.
    this.movieApiService.getMovie(title).pipe(
      tap((data) => this.moveStoreV1.setSelectedMovie(data)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  getWatchList(): void {
    this.moveStoreV1.setWatchList(this.getWatchListOnLocalStorage());
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
      tap((data) => this.moveStoreV1.setMovies(data)),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  modifyWatchList(movie: IMovie): void {
    this.watchList$.pipe(
      take(1),
      tap((movies) => {
        if(movies.some(m => m.title === movie.title)) {
          this.moveStoreV1.removeToWatchList(movie);
        } else {
          this.moveStoreV1.addToWatchList(movie);
        }
    }),
    takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  selectMovie(movie: IMovie): void {
    this.moveStoreV1.setSelectedMovie(movie);
  }
}
