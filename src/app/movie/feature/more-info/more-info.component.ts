import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Injector, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, computed, effect, inject } from '@angular/core';
import { MovieDetailComponent } from '../../ui/movie-detail/movie-detail.component';
import { MovieStoreV2 } from '../../data-access/movie-store-v2';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, of, switchMap, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieApiService } from 'src/app/shared/api/movie-api.service';
import { IMovie, LocalStorageKey } from 'src/app/shared/model/movie';
import { LocalStorageUtil } from '../../utils/local-storage.util';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MovieDetailComponent],
  standalone: true,
})
export class MoreInfoComponent implements OnInit, OnChanges {
  // I used this to show how @Input Read as Angular Route Parameter
  @Input('title') title: string | undefined;
  
  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private movieApiService: MovieApiService,
    private movieStoreV2: MovieStoreV2) {}
  
  destroyRef = inject(DestroyRef);
  watchList = computed(() => {
    const data = this.movieStoreV2.watchList();
    return Array.from(data.values());
  });
  movieDetails =computed(() =>  {
    const selected = this.movieStoreV2.movieSelected();
    const watchList = this.watchList();
    const movie = watchList.some(x => x.title === selected?.title);
    return !!selected ? <IMovie>{ ...selected, isWatchList: !!movie } : undefined
  });

  ngOnInit(): void {
    // UnComment this if you want to use Reactive route params
    // Instead of @Input Angular Route Parameter
    // this.initRouteParams();
    this.getWatchList();
    this.initEffects();
  }

  ngOnChanges(changes: { title: SimpleChange }): void {
    // Comment this to avoid using @Input as Angular Router Parameter
    // Instead of Reactive route params
    if(changes.title?.currentValue && !this.movieDetails()) {
      this.getMovie(this.title!, this.getWatchListOnLocalStorage());
    }
  }

  requestModifyWatchList(movie: IMovie): void {
    if(this.watchList().some(m => m.title === movie.title)) {
      this.movieStoreV2.removeToWatchList(movie);
    } else {
      this.movieStoreV2.addToWatchList({...movie, isWatchList: true});
    }
  }

  private initRouteParams(): void {
    this.route.params
    .pipe(
     take(1),
     filter((query) => query['title']),
     map((query) =>query['title']  as string),
     switchMap((title) => this.movieApiService.getMovie(title)),
     tap((data) => {
      this.movieStoreV2.setSelectedMovie(data)
     }))
     .subscribe();
  }

  private getMovie(title: string, movies?: IMovie[]): void {
    of(null).pipe(
      concatMap(() => {
        return  this.movieApiService.getMovie(title);
      }),
      tap((data) => {
        const movie = movies?.find(x => x.title === title);
        data.isWatchList = !!movie;
        this.movieStoreV2.setSelectedMovie(data);
      }),
      takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private initEffects(): void {
    effect(() => {
      this.setWatchListOnLocalStorage( this.watchList());
    }, { injector: this.injector});

  }  

  private getWatchList(): void {
    this.movieStoreV2.setWatchList(this.getWatchListOnLocalStorage());
  }

  private getWatchListOnLocalStorage(): IMovie[] {
    return LocalStorageUtil.getItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST) || [];
  }

  private setWatchListOnLocalStorage(item: IMovie[]): void {
    return LocalStorageUtil.setItem<IMovie[]>(LocalStorageKey.MOVIE_WATCH_LIST, item);
  }
}
