import { FileStorageService } from './../services/file-storage.service';
import { FavoriteService } from './../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  favorites: any[];
  constructor(private favoritesService: FavoriteService, 
              private alertCtrl: AlertController, 
              private permissions: AndroidPermissions,  
              private fileStorage: FileStorageService,
              private navCtrl: NavController) { }
  ionViewDidEnter(){
    this.favorites = this.favoritesService.GetFavorites();
  }
  
  async Delete(films: any){
    const alert = await this.alertCtrl.create({
      header: "Attention!",
      message: "Êtes-vous sur de vouloir supprimer " +films.Title+" de vos favoris?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.favoritesService.DeleteExistingFilm(films);
          }
        }
      ]
    });
    await alert.present()
  }
  
  exportJson(){
    this.fileStorage.exportFile(JSON.stringify(this.favoritesService.GetFavorites()), "text", "json");
  }

  importJson(){
    this.fileStorage.importFile();
  }

  GoToFilm(id: any){
    this.navCtrl.navigateForward(['single-movie',{ id: id }]);
  }
}
