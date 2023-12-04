import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoUtil } from '../../utils/video.util';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-trailer-modal',
  templateUrl: './movie-trailer-modal.component.html',
  styleUrls: ['./movie-trailer-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatDialogModule, MatDialogModule, MatButtonModule, MatIconModule],
  standalone: true,
})
export class MovieTrailerModalComponent {

  constructor(public dialogRef: MatDialogRef<MovieTrailerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer) {}

  get movieTrailerSrc(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(VideoUtil.convertYoutubeLinkToEmbededURL(this.data?.url));
  }

  close(): void {
    this.dialogRef.close();
  }
}
