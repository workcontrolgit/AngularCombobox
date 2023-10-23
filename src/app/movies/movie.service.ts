import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Movie } from '@app/@shared/models/movie-model';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor(private httpClient: HttpClient) {}

  getMovies(term?: string): Observable<Movie[]> {
    return this.httpClient
      .get<any>(environment.apiBaseUrl + term)
      .pipe(map(resp => {
          return resp.Search;
      })
      );
  }
}
