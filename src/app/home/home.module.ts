import { HttpClient } from '@angular/common/http';
import { MovieProviderService } from './../services/movie-provider.service';
import { URLCallerHelper } from './../helpers/URLCallerHelper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  providers: [MovieProviderService, URLCallerHelper, HttpClient]
})
export class HomePageModule {}
