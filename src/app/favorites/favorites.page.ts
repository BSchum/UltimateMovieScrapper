import { FileStorageService } from './../services/file-storage.service';
import { FavoriteService } from './../services/favorite.service';
import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import * as converter from 'json-2-csv';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  favorites: any[];
  toCSV : boolean = true;
  constructor(private favoritesService: FavoriteService,
              private alertCtrl: AlertController,
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
    if(this.toCSV){
      converter.json2csv(this.favoritesService.GetFavorites(), (err, file) => {
        this.fileStorage.exportFile(file, "text", "csv");
      }, {})
      
    }else{
      this.fileStorage.exportFile(JSON.stringify(this.favoritesService.GetFavorites()), "text", "json");
    }
  }

  importJson(){
    this.fileStorage.importFile().then((parsedFavorites) => {
      this.favoritesService.ReplaceFavorites(parsedFavorites);
      this.favorites = this.favoritesService.GetFavorites();
    })
    .catch((message) => {
      console.log(message);
    });
  }

  GoToFilm(id: any){
    this.navCtrl.navigateForward(['single-movie',{ id: id }]);
  }
}
