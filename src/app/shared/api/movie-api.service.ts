import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMovie } from '../model/movie';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  readonly API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.API}/data`);
  }
  getMovie(title: string): Observable<IMovie> {
    let params = new HttpParams();
    params = params.set('title', title);
    return this.http.get<IMovie[]>(`${this.API}/data`, { params: params })
    .pipe(map(response => response?.[0] || null));
  }
}
