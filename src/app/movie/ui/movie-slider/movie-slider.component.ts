import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Injector, Input, OnInit, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMovie } from 'src/app/shared/model/movie';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss'],
  imports: [CommonModule, RouterModule, DatePipe],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ],
  standalone: true,
})
export class MovieSliderComponent implements OnInit {
  @Input() movies: IMovie[] = [];

  current = signal(0);

  constructor(private injector: Injector) {}
  ngOnInit(): void {
    effect(() => {
      setInterval(() => {
        this.current.update(x => ++x % this.movies.length);
      }, 3000);
    }, { injector: this.injector});
  }
}
