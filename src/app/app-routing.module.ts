import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './pages/add-movie/add-movie.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MoviesInCategoryComponent } from './pages/categories/movies-in-category/movies-in-category.component';
import { HttpTestsComponent } from './pages/http-tests/http-tests.component';
import { MovieDetailsComponent } from './pages/movies/movie-details/movie-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MoviesInYearsComponent } from './pages/years/movies-in-years/movies-in-years.component';
import { YearsComponent } from './pages/years/years.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, pathMatch: 'full' },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'categories', component: CategoriesComponent, pathMatch: 'full' },
  { path: 'categories/:id', component: MoviesInCategoryComponent },
  { path: 'years', component: YearsComponent, pathMatch: 'full' },
  { path: 'years/:id', component: MoviesInYearsComponent },
  { path: 'http-tests', component: HttpTestsComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
