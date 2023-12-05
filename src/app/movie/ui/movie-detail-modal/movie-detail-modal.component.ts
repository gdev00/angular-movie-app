import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoUtil } from '../../utils/video.util';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { IMovie } from 'src/app/shared/model/movie';

@Component({
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrls: ['./movie-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatDialogModule, MatDialogModule, MatButtonModule, MatIconModule, TooltipModule],
  standalone: true,
})
export class MovieDetailModalComponent {
  @Output() watchListAction = new EventEmitter<IMovie>();
  constructor(public dialogRef: MatDialogRef<MovieDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private router: Router) {}

  get movieTrailerSrc(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(VideoUtil.convertYoutubeLinkToEmbededURL(this.data.movie?.trailerLink));
  }

  requestUpdateWatchList(movie: IMovie): void {
    this.watchListAction.emit(movie);
  }

  close(): void {
    this.router.navigate([]);
    this.dialogRef.close();
  }
}
