import { ActivatedRoute } from '@angular/router';
import { SingleMoviePage } from './../single-movie/single-movie.page';
import { MovieProviderService } from './../services/movie-provider.service';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/compiler/src/core';
import { providerDef } from '@angular/core/src/view';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  movies: any;
  searchText: string;

  constructor(private provider: MovieProviderService, private navCtrl: NavController, private route:ActivatedRoute){

  }

  OnSearch(search: string){
    if(search != ""){
      this.route.params.subscribe(data => {
        if(data.id == "movies"){
          this.provider.GetMovies(search).then(data => {
            this.movies = data;
            console.log(this.movies);
            this.movies.Search.sort((a, b) => {
              return b.Year - a.Year;
            })
          });

        }else{
          this.provider.GetSeries(search).then(data => {
            this.movies = data;
            console.log(this.movies);
            this.movies.Search.sort((a, b) => {
              return b.Year - a.Year;
            })
          });
        }
      });
      
    }
  }

  ngOnInit(){
    this.OnSearch("marvel");
  }
  onInput(event: Event){
    this.OnSearch(this.searchText);
  }

  onMovieClick(id: string){
    this.navCtrl.navigateForward(['single-movie',{ id: id }]);
  }
}
