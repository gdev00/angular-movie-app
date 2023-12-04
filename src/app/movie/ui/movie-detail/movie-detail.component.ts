import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMovie } from 'src/app/shared/model/movie';
import { VideoUtil } from '../../utils/video.util';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieTrailerModalComponent } from '../movie-trailer-modal/movie-trailer-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, TooltipModule],
  standalone: true,
})
export class MovieDetailComponent {
  @Input() item: IMovie | null | undefined;
  @Output() watchListAction = new EventEmitter<IMovie>();
  constructor(public dialog: MatDialog) {}

  requestUpdateWatchList(movie: IMovie): void {
    this.watchListAction.emit(movie);
  }

  requestPlayTrailer(url: string): void {
    this.dialog.open(MovieTrailerModalComponent, {
      data: { url: url }
    });
  }

}
