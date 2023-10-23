import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let movieService: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    movieService = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRandomMovie', () => {
    it('should return a random Chuck Norris movie', () => {
      // Arrange
      const mockMovie = { value: 'a random movie' };

      // Act
      const randomMovieSubscription = movieService.getRandomMovie({ category: 'toto' });

      // Assert
      randomMovieSubscription.subscribe((movie: string) => {
        expect(movie).toEqual(mockMovie.value);
      });
      httpMock.expectOne({}).flush(mockMovie);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomMovieSubscription = movieService.getRandomMovie({ category: 'toto' });

      // Assert
      randomMovieSubscription.subscribe((movie: string) => {
        expect(typeof movie).toEqual('string');
        expect(movie).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error',
      });
    });
  });
});
