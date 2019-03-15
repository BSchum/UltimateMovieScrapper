import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: any[];
  constructor() { 
  }

  GetFavorites(): any[]{
    if(localStorage.getItem("favorites") != null){
      console.log(JSON.parse(localStorage.getItem("favorites")));
      this.favorites =  JSON.parse(localStorage.getItem("favorites"));
    }else{
      this.favorites = [];
    }
    return this.favorites;
  }

  AddToFavorite(films: any){
    this.GetFavorites();

    if(!this.IsInFavorite(films)){
      this.favorites.push(films);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }else if(this.IsInFavorite(films)){
      this.DeleteExistingFilm(films);
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
  DeleteExistingFilm(films: any){
    console.log("LOL");
    var index = this.favorites.findIndex((element) => {
      return element.Title == films.Title;
    });
    if(index > -1){
      this.favorites.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
  IsInFavorite(films: any){
    return this.GetFavorites().find((element) => {
      return element.Title == films.Title;
    }) != null;
  }
} 
