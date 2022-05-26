import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movies-in-years',
  templateUrl: './movies-in-years.component.html',
  styleUrls: ['./movies-in-years.component.css'],
})
export class MoviesInYearsComponent implements OnInit {
  movies: Observable<Movie[]>;
  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movies = this.route.paramMap.pipe(
      switchMap(() =>
        this.http.getMoviesFromYear(this.route.snapshot.params.id)
      )
    );
  }
}
