import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { HttpMoviesService } from 'src/app/services/http-movies.service';

@Component({
  selector: 'app-http-tests',
  templateUrl: './http-tests.component.html',
  styleUrls: ['./http-tests.component.css'],
})
export class HttpTestsComponent {
  errorMessage: string;
  constructor(private httpMoviesService: HttpMoviesService) {}

  movie: Movie = {
    title: 'string',
    year: 'string',
    category: 'string',
    director: 'string',
    plot: 'string',
    poster: 'string',
    country: 'string',
    imdbRating: 'string',
  };
  movieToPut: Movie = {
    id: '54',
    title: 'replace',
    year: 'string',
    category: 'string',
    director: 'string',
    plot: 'replace',
    poster: 'replace',
    country: 'string',
    imdbRating: 'string',
  };
  movieToPatch: Partial<Movie> = {
    id: '54',
    title: 'patch',
  };

  getMethod() {
    this.httpMoviesService.getMovies().subscribe();
  }
  postMethod() {
    this.httpMoviesService.postMovies(this.movie).subscribe();
  }
  putMethod() {
    this.httpMoviesService.putMovies(this.movieToPut).subscribe();
  }
  patchMethod() {
    this.httpMoviesService.patchMovies(this.movieToPatch).subscribe();
  }
  deleteMethod() {
    this.httpMoviesService.deleteMovies(54).subscribe();
  }
  errorHandling() {
    this.httpMoviesService
      .makeError()
      .subscribe({ error: (err: string) => (this.errorMessage = err) });
  }
  headers() {
    this.httpMoviesService.headers().subscribe();
  }
  params() {
    this.httpMoviesService.params().subscribe();
  }
}
