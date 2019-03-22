import { FavoriteService } from './../services/favorite.service';
import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieProviderService } from './../services/movie-provider.service';
import { TouchSequence } from 'selenium-webdriver';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.page.html',
  styleUrls: ['./single-movie.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingleMoviePage implements OnInit {
  movie: any;
  id: string;
  poster: string;
  showme: boolean= false;
  actorshowme: boolean = false;
  infoshowme: boolean = false;
  markshowme: boolean = false;
  hideInfos: boolean = true;
  rating : number[];
  seasonshowme: boolean[];
  @ViewChild("singleMovieCard") singleMovieCard;

  constructor(private provider: MovieProviderService, private thisRoute:ActivatedRoute, private renderer: Renderer, private navCtrl: NavController, private favorites: FavoriteService) { }

  ngOnInit() {
    this.thisRoute.params.subscribe(params => {
      this.id = params.id;
      this.provider.GetSingleMovie(this.id).then(data => {
        this.movie = data;

        this.provider.GetPoster(this.id).then((url: string) =>{
          this.poster = "url("+url+")";
        }).catch((err) => {
           this.poster = "url("+this.movie.Poster+")";
        });
        if(this.movie.Type == "series"){
          this.provider.GetSeasons(this.id, this.movie.totalSeasons).then(data => {
            this.movie.Seasons = data;
            this.seasonshowme = Array(this.movie.Seasons.length).fill(true);
          });
        }

        let nbFullStar = Math.floor(this.movie.imdbRating);
        let nbHalfStar = Math.ceil(this.movie.imdbRating - nbFullStar);
        let nbEmptyStar = 10 - (nbFullStar + nbHalfStar);
        this.rating = Array(10).fill(1, 0, nbFullStar).fill(2, nbFullStar, nbFullStar + nbHalfStar).fill(3,10 - nbEmptyStar, 10);
        });
    });
  }
  goBack(){
    this.navCtrl.goBack();
  }
  fadeCard(){
    this.hideInfos = !this.hideInfos;
    if(!this.hideInfos){
      this.renderer.setElementStyle(this.singleMovieCard.nativeElement, 'opacity', '0');
    }else{
      this.renderer.setElementStyle(this.singleMovieCard.nativeElement, 'opacity', '1');
    }
  }

  goToSeason(seasonID: any, serieID: any){
    this.navCtrl.navigateForward(['single-season', {seasonID: seasonID, serieID:serieID}]);
  }

  AddToFavorite(films: any){
    this.favorites.AddToFavorite(films);
  }

  IsInFavorite(films: any){
    return this.favorites.IsInFavorite(films);
  }
}
