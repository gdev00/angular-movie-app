import { Injectable, signal } from "@angular/core";
import { IMovie, IMovieStateV2 } from "src/app/shared/model/movie";

@Injectable({
    providedIn: 'root'
})
export class MovieStoreV2 {
    private readonly state: IMovieStateV2 = {
        movieSelected: signal<IMovie | undefined>(undefined),
        movies: signal<IMovie[]>([]),
        watchList: signal<Map<string, IMovie>>(new Map()),
        sortBy:signal<keyof IMovie | undefined>(undefined),
        isLoading: signal<boolean>(true),
      } as const;
   
    readonly movieSelected = this.state.movieSelected;
    readonly movies = this.state.movies;
    readonly watchList = this.state.watchList;
    readonly sortBy = this.state.sortBy;
    readonly isLoading = this.state.isLoading;

    setSelectedMovie(m: IMovie): void {
        this.state.movieSelected.set(m);
    }
    
    setMovies(m: IMovie[]): void {
      this.state.movies.set(m);
    }

    setLoading(l: boolean): void {
      this.state.isLoading.set(l);
    }

    setWatchList(movies: IMovie[]): void {
      this.state.watchList.set(new Map<string, IMovie>(
        movies.map((movie) => [movie.title, movie])
      ));
    }

    setSortBy(by: keyof IMovie | undefined): void {
      this.state.sortBy.set(by);
    }

    addToWatchList(movie: IMovie): void {
      this.state.watchList.update(value => value.set(movie.title, movie));
    }

    removeToWatchList(movie: IMovie): void {
        this.state.watchList.update(value => {
            value.delete(movie.title);
            return value;
        });
    }
}