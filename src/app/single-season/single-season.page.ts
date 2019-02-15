import { MovieProviderService } from './../services/movie-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-season',
  templateUrl: './single-season.page.html',
  styleUrls: ['./single-season.page.scss'],
})
export class SingleSeasonPage implements OnInit {

  constructor(private route: ActivatedRoute, private provider:MovieProviderService) { }
  season: any;
  episodes: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.provider.GetSeason(params.seasonID, params.serieID).then( async (data) => {
        this.season = data;
        console.log(data);
      });
    });
  }
}
