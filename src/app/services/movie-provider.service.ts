import { URLCallerHelper } from './../helpers/URLCallerHelper';
import { Injectable } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Injectable()
export class MovieProviderService {
  //TODO config
  private static API_URL:string = "http://www.omdbapi.com/";
  private static IMG_API_URL:string = "http://img.omdbapi.com/";
  private static API_KEY:string = "75522b56";
  constructor(private caller: URLCallerHelper) { 

  }

  public GetMovies(search: string){
    return new Promise((resolve, reject) => {
      this.caller.Get(MovieProviderService.API_URL+"?apikey="+MovieProviderService.API_KEY+"&s=\""+search+"\"&type=movie").then((data) =>{
        resolve(data);
      })
      .catch((err)=>{
        reject(err);
      });
    })
  }

  public GetSeries(search: string){
    return new Promise((resolve, reject) => {
      this.caller.Get(MovieProviderService.API_URL+"?apikey="+MovieProviderService.API_KEY+"&s=\""+search+"\"&type=series").then((data) =>{
        resolve(data);
      })
      .catch((err)=>{
        reject(err);
      });
    })
  }

  public GetSingleMovie(id: string){
    return new Promise((resolve, reject) => {
      console.log(id);
      this.caller.Get(MovieProviderService.API_URL+"?apikey="+MovieProviderService.API_KEY+"&plot=full&i="+id).then((data) =>{
        console.log(data);
        resolve(data);
      })
      .catch((err)=>{
        reject(err);
      });
    })
  }

  public GetPoster(id: string){
    return new Promise((resolve, reject) => {
      let url = MovieProviderService.IMG_API_URL+"?apiKey="+MovieProviderService.API_KEY+"&i="+id+"&h=9000";
      console.log(url);
      this.caller.Get(url, "blob").then((data) =>{
        resolve(url);
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  public GetSeasons(id: string, seasonNumber: number){
    return new Promise((resolve, reject) => {
      return new Promise(async (resolve, reject) => {
        var seasons = [];

        for (var i = 1; i <= seasonNumber; i++) {
          let url = MovieProviderService.API_URL+"?apiKey="+MovieProviderService.API_KEY+"&i="+id+"&Season="+i;
          await this.caller.Get(url).then((data) =>{
            seasons[i-1] = data;
          }).catch((err)=>{
            reject(err);
          });
        }
        resolve(seasons);
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public GetSeason(id: number, serieID: string){
    return new Promise((resolve, reject) => {
      let url = MovieProviderService.API_URL+"?apiKey="+MovieProviderService.API_KEY+"&i="+serieID+"&Season="+id;
      this.caller.Get(url).then((data) => {
        resolve(data);
      });
    });
  }
}
