import { Component, OnInit } from '@angular/core';
import { Logger } from '@shared';
const log = new Logger('Movie');
import { FormBuilder, FormGroup } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { Movie } from '@app/@shared/models/movie-model';

import { MovieService } from './movie.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movies$?: Observable<Movie[]>;
  moviesLoading = false;
  moviesInput$ = new Subject<string>();
  minLengthTerm = 4;
  selectedMovie?: Movie[];

  defaultRate = 8;

  constructor(private movieService: MovieService, private fb:FormBuilder) {}

  isSubmitted=false;
  onPost= ()=>this.isSubmitted=true;
  frm!:FormGroup;

  ngOnInit() {
      this.loadMovies();
      // this.movieService.loadMovies(this.moviesLoading, this.moviesInput$, this.minLengthTerm, this.movies$);

      this.frm = this.fb.group({
        'selectedMovie':[],
        'selectedRating': [this.defaultRate]
     })
  }

  trackByFn(item: Movie) {
    return item.imdbID;
  }

  loadMovies() {

    this.movies$ = concat(
      of([]), // default items
      this.moviesInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.moviesLoading = true),
        switchMap(term => {

          return this.movieService.getMovies(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.moviesLoading = false)
          )
        })
      )
    );

  }

}
