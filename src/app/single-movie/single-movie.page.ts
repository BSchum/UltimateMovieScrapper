import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieProviderService } from './../services/movie-provider.service';
import { TouchSequence } from 'selenium-webdriver';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';

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

  @ViewChild("singleMovieCard") singleMovieCard;
  @ViewChild("hideButton") hideButton;

  constructor(private provider: MovieProviderService, private thisRoute:ActivatedRoute, private renderer: Renderer) { }

  ngOnInit() {
    this.thisRoute.params.subscribe(params => {
      this.id = params.id;
      this.provider.GetSingleMovie(this.id).then(data => {
        this.movie = data;

        this.provider.GetPoster(this.id).then((url: string) =>{
          this.poster = "url("+url+")";
          console.log(this.poster);

        }).catch((err) => {
           this.poster = "url("+this.movie.Poster+")";
           console.log(this.poster);

        });
        let nbFullStar = Math.floor(this.movie.imdbRating);
        let nbHalfStar = Math.ceil(this.movie.imdbRating - nbFullStar);
        let nbEmptyStar = 10 - (nbFullStar + nbHalfStar);
        this.rating = Array(10).fill(1, 0, nbFullStar).fill(2, nbFullStar, nbFullStar + nbHalfStar).fill(3,10 - nbEmptyStar, 10);
        console.log(this.rating);
        });
    });
  }

  fadeCard(){
    console.log(this.singleMovieCard);
    this.hideInfos = !this.hideInfos;
    if(!this.hideInfos){
      this.renderer.setElementStyle(this.singleMovieCard.nativeElement, 'opacity', '0');
      this.renderer.setElementStyle(this.hideButton.nativeElement, 'background-color', 'transparent');
    }else{
      this.renderer.setElementStyle(this.singleMovieCard.nativeElement, 'opacity', '1');
      this.renderer.setElementStyle(this.hideButton.nativeElement, 'background-color', 'white');

    }
  }
}
