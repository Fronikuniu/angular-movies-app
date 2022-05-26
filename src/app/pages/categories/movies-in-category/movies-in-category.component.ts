import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movies-in-category',
  templateUrl: './movies-in-category.component.html',
  styleUrls: ['./movies-in-category.component.css'],
})
export class MoviesInCategoryComponent implements OnInit {
  movies: Observable<Movie[]>;

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit() {
    // If we are on the movies-in-category page, and we change manually the category, this will render component with old data
    // const category = this.route.snapshot.paramMap.get('id');
    // this.movies = this.http.getMoviesFromCategory(category);

    this.movies = this.route.paramMap.pipe(
      switchMap((params: Params) =>
        this.http.getMoviesFromCategory(params.get('id'))
      )
    );
  }
}
