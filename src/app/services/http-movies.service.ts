import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class HttpMoviesService {
  errorMessage: string;
  private url = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  // method get with options
  // getMovies(): Observable<HttpResponse<Movie[]>> {
  //   return this.http
  //     .get<HttpResponse<Movie[]>>(this.url, { observe: 'response' })
  //     .pipe(tap(console.log));
  // }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url).pipe(tap(console.log));
  }

  postMovies(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie).pipe(tap(console.log));
  }

  putMovies(movie: Movie): Observable<Movie> {
    return this.http
      .put(this.url + '/' + movie.id, movie)
      .pipe(tap(console.log));
  }

  patchMovies(movie: Partial<Movie>): Observable<Movie> {
    return this.http
      .patch(this.url + '/' + movie.id, movie)
      .pipe(tap(console.log));
  }

  deleteMovies(id: number): Observable<{}> {
    return this.http.delete(this.url + '/' + id).pipe(tap(console.log));
  }

  makeError(): Observable<HttpErrorResponse> {
    return this.http
      .delete(this.url + '/' + 999)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(
      `Name: ${error.name} \nMessage: ${error.message} \nError code: ${error.status}`
    );
    return throwError('Something bad happened; please try again later.');
  }

  headers(): Observable<HttpResponse<Movie[]>> {
    // my own headers
    const myHeaders = new HttpHeaders({
      Authorizations: 'my_token',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'my_custom_header',
    });
    return this.http
      .get<Movie[]>(this.url, { observe: 'response', headers: myHeaders })
      .pipe(
        tap({
          next: (res: HttpResponse<Movie[]>) => {
            console.log(res.headers.keys());
            console.log(res.headers.get('Cache-Control'));
            console.log(res.headers.get('Content-Type'));
            console.log(res.headers.get('Expires'));
            console.log(res.headers.get('Pragma'));
          },
        })
      );
  }

  params(): Observable<Movie> {
    const myParams = new HttpParams()
      .set('_sort', 'title')
      .set('_order', 'desc');
    return this.http.get(this.url, { params: myParams }).pipe(tap(console.log));
  }
}
