import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMovie } from 'src/app/shared/model/movie';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, TooltipModule],
  standalone: true,
})
export class MovieCardComponent {
  @Input() item: IMovie | null | undefined;
  @Output() watchListAction = new EventEmitter<IMovie>();
  @Output() selected = new EventEmitter<IMovie>();

  requestUpdateWatchList(movie: IMovie): void {
    this.watchListAction.emit(movie);
  }

  selectMovie(movie: IMovie): void {
    this.selected.emit(movie);
  }
}
