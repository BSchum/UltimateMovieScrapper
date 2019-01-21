import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieProviderService } from './../services/movie-provider.service';

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
  actorshowme: boolean= false;
  infoshowme: boolean= false;

  constructor(private provider: MovieProviderService, private thisRoute:ActivatedRoute) { }

  ngOnInit() {
    this.thisRoute.params.subscribe(params => {
      this.id = params.id;
      this.provider.GetSingleMovie(this.id).then(data => {
        this.movie = data;
        console.log(this.movie);
        this.poster = "url("+this.movie.Poster+")";
        });
    });
  }
}
