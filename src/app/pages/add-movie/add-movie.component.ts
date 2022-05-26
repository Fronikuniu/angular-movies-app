import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { HttpMoviesService } from 'src/app/services/http-movies.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  model: Movie = {
    title: '',
    year: '',
    category: '',
    director: '',
    plot: '',
    poster: 'https://via.placeholder.com/150',
    country: '',
    imdbRating: '',
  };
  years: Observable<string[]>;
  categories: Observable<string[]>;

  constructor(
    private http: HttpService,
    private httpMovies: HttpMoviesService
  ) {}

  ngOnInit(): void {
    this.years = this.http.getYears().pipe(map(results => results.sort()));
    this.categories = this.http
      .getCategories()
      .pipe(map(results => results.sort()));
  }

  addMovie() {
    if (Object.values(this.model).every(value => value !== '')) {
      this.httpMovies.postMovies(this.model).subscribe(
        result => console.log(result),
        error => console.log(error)
      );
      this.model = {
        title: '',
        year: '',
        category: '',
        director: '',
        plot: '',
        poster: 'https://via.placeholder.com/150',
        country: '',
        imdbRating: '',
      };
    }
  }
}
