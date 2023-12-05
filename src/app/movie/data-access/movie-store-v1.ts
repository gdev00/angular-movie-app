import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IMovie } from 'src/app/shared/model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieStoreV1 {
  private _movieSelected$ = new BehaviorSubject<IMovie | undefined>(undefined);
  private _movies$ = new BehaviorSubject<IMovie[]>([]);
  private _watchList$ = new BehaviorSubject<Map<string, IMovie>>(new Map());
  private _isLoading$ = new BehaviorSubject<boolean>(true);

  movieSelected$ = this._movieSelected$.asObservable();
  movies$ = this._movies$.asObservable();
  watchList$: Observable<IMovie[]> = this._watchList$.asObservable().pipe(
    map(listMap => Array.from(listMap.values()))
  );
  isLoading$ = this._isLoading$.asObservable();

  constructor() { }
  setLoading(l: boolean): void {
    this._isLoading$.next(l);
  }

  setSelectedMovie(m: IMovie): void {
    this._movieSelected$.next(m);
  }

  setMovies(m: IMovie[]): void {
    this._movies$.next(m);
  }

  setWatchList(movies: IMovie[]): void {
    this._watchList$.next(new Map<string, IMovie>(
      movies.map((movie) => [movie.title, movie])
    ));
  }

  addToWatchList(movie: IMovie): void {
    const listMap = this._watchList$.getValue();
    listMap.set(movie.title, movie);
    this._watchList$.next(listMap);
  }

  removeToWatchList(movie: IMovie): void {
    const listMap = this._watchList$.getValue();
    listMap.delete(movie.title);
    this._watchList$.next(listMap);
  }
}
