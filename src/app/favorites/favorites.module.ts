import { FavoriteService } from './../services/favorite.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavoritesPage } from './favorites.page';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


const routes: Routes = [
  {
    path: '',
    component: FavoritesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  declarations: [FavoritesPage],
  providers: [FavoriteService, FileChooser, FilePath]

})
export class FavoritesPageModule {}
