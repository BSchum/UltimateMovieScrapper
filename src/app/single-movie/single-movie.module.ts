import { FavoriteService } from './../services/favorite.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SingleMoviePage } from './single-movie.page';
import { HttpClient } from '@angular/common/http';
import { MovieProviderService } from './../services/movie-provider.service';
import { URLCallerHelper } from './../helpers/URLCallerHelper';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: SingleMoviePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SingleMoviePage],
  providers: [MovieProviderService, URLCallerHelper, HttpClient, FavoriteService]

})
export class SingleMoviePageModule {}
