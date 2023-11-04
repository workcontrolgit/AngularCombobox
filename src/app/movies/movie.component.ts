import { Component, OnInit } from '@angular/core';
import { Logger } from '@shared';
const log = new Logger('Movie');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { Movie } from '@app/@shared/models/movie-model';

import { MovieService } from './movie.service';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movies$?: Observable<Movie[]>;
  searching = false;
  searchingText$ = new Subject<string>();
  minLengthTerm = 4;
  selectedMovie?: Movie[];

  defaultRate = 0;

  constructor(private movieService: MovieService, private fb:FormBuilder) {}

  isSubmitted=false;
  onPost= ()=>this.isSubmitted=true;
  frm!:FormGroup;

  ngOnInit() {
      this.loadMovies();
      // this.movieService.loadMovies(this.searching, this.searchingText$, this.minLengthTerm, this.movies$);

      this.frm = this.fb.group({
        'selectedMovie':[null, Validators.required],
        'selectedRating': [null, Validators.required]
     })
  }

  trackByFn(item: Movie) {
    return item.imdbID;
  }

  loadMovies() {

    this.movies$ = concat(
      of([]), // default items
      this.searchingText$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => this.searching = true),
        switchMap(term => {

          return this.movieService.getMovies(term).pipe(
            tap(() => this.searching = false),
            catchError(() => of([])) // empty list on error
          )
        })
      )
    );

  }
  // convenience getter for easy access to form fields
  get f() {
    return this.frm.controls;
  }

}
