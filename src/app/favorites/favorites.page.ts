import { FileStorageService } from './../services/file-storage.service';
import { FavoriteService } from './../services/favorite.service';
import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import * as converter from 'json-2-csv';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TargetLocator } from 'selenium-webdriver';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  favorites: any[];
  toCSV : boolean = true;
  url: string;
  safeUrl: SafeUrl;
  isNative : boolean;

  constructor(private favoritesService: FavoriteService,
              private alertCtrl: AlertController,
              private fileStorage: FileStorageService,
              private navCtrl: NavController, 
              private plateform : Platform) { 
                this.isNative = this.plateform.is("cordova");    

              }

  ionViewDidEnter(){
    this.favorites = this.favoritesService.GetFavorites();
    this.GetSafeUrl();
  }
  
  GetSafeUrl(){
    if(!this.isNative){
      if(this.toCSV){
        console.log("csv");
        this.fileStorage.GetDataUrl(this.favoritesService.GetFavorites(), "csv").then((url) =>{
          this.safeUrl = url;
        });
      }else{
        console.log("json");
        this.fileStorage.GetDataUrl(this.favoritesService.GetFavorites(), "json").then((url) =>{
          this.safeUrl = url;
        });
      }
    }
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
            this.favorites = this.favoritesService.GetFavorites();
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

  importJsonPC(event){
    if(!this.isNative){
      const file = event.target.files[0];
      if(file != undefined){
        var reader = new FileReader();
        var context = this;
        reader.onload = function(event) {
          if(file.name.endsWith(".json")){
            var parsedFavorites =  JSON.parse(reader.result as string);
            context.favoritesService.ReplaceFavorites(parsedFavorites);
            context.favorites = context.favoritesService.GetFavorites();
          }else if(file.name.endsWith(".csv")){
            var parsedFavorites =  JSON.parse(reader.result as string);
            context.favoritesService.ReplaceFavorites(parsedFavorites);
            context.favorites = context.favoritesService.GetFavorites();
          }
        };
        reader.readAsText(file);
      }
    }
  }

  importJson(){
    this.fileStorage.importFile().then((parsedFavorites) => {
      this.favoritesService.ReplaceFavorites(parsedFavorites);
      this.GetSafeUrl();
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
