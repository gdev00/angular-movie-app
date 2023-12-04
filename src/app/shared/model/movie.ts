import { Signal, WritableSignal } from "@angular/core";

export enum LocalStorageKey {
    MOVIE_WATCH_LIST = 'movie-watch-list'
}

export interface IMovie {
    title: string;
    description: string;
    rating: number;
    duration: string;
    genre: string;
    releaseDate: string;
    trailerLink: string;
    imageName: string;
    rate: string;
    review: number;
    isWatchList?: boolean;
}

export interface IMovieStateV2 {
    movieSelected: WritableSignal<IMovie | undefined>,
    movies: WritableSignal<IMovie[]>,
    watchList: WritableSignal<Map<string, IMovie>>
    sortBy: WritableSignal<keyof IMovie | undefined>,
    isLoading: WritableSignal<boolean>,
  }