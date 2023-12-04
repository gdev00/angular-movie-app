import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMovie } from 'src/app/shared/model/movie';
import { VideoUtil } from '../../utils/video.util';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true,
})
export class MovieDetailComponent {
  @Input() item: IMovie | null | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  get movieTrailerSrc(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(VideoUtil.convertYoutubeLinkToEmbededURL(this.item?.trailerLink));
  }
}
