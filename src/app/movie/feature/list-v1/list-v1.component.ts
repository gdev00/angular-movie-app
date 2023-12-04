import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieFacadeService } from '../../data-access/movie-facade.service';
import { combineLatest, filter, map, take, tap } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { IMovie } from 'src/app/shared/model/movie';
import { MovieState } from '../../data-access/movie-state';
import { MovieApiService } from 'src/app/shared/api/movie-api.service';
import { MovieDetailComponent } from '../../ui/movie-detail/movie-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-v1',
  templateUrl: './list-v1.component.html',
  styleUrls: ['./list-v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovieFacadeService, MovieApiService, MovieState],
  imports: [CommonModule, MovieDetailComponent],
  standalone: true,
})
export class ListV1Component implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieFacadeService: MovieFacadeService) {}
  movieDetails$ = this.movieFacadeService.movieSelected$;
  watchList$ =  this.movieFacadeService.watchList$
  .pipe(
    tap((watchList) => {
      this.movieFacadeService.setWatchListOnLocalStorage(watchList);
    })
  );
  movies$ = combineLatest([
    this.movieFacadeService.movies$,
    this.watchList$
  ])
  .pipe(
    map(([movies, watchList]) => {
      return movies.map(movie => {
        const isWatchList = watchList.some(watchedMovie => watchedMovie.title === movie.title);
        return {
            ...movie,
            isWatchList,
        };
    });    
    })
  );
  
 
  ngOnInit(): void {
    this.initRouteQueryParams();
    this.movieFacadeService.getMovies();
    this.movieFacadeService.getWatchList();
  }

  initRouteQueryParams(): void {
    this.route.queryParams
    .pipe(
     take(1),
     filter((query) => query['title']),
     map((query) =>query['title']  as string),
     tap((title) => {
      this.movieFacadeService.getMovie(title);
     })).subscribe();
  }

  requestSortBy(by: keyof IMovie): void {
    this.movieFacadeService.sortMovies(by);
  }

  requestModifyWatchList(movie: IMovie): void {
    this.movieFacadeService.modifyWatchList(movie);
  }

  requestShowDetails(movie: IMovie): void {
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
