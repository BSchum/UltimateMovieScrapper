import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SingleSeasonPage } from './single-season.page';
import { MovieProviderService } from '../services/movie-provider.service';
import { URLCallerHelper } from '../helpers/URLCallerHelper';

const routes: Routes = [
  {
    path: '',
    component: SingleSeasonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SingleSeasonPage],
  providers: [MovieProviderService, URLCallerHelper, HttpClient]

})
export class SingleSeasonPageModule {}
