var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieProviderService } from './../services/movie-provider.service';
var SingleMoviePage = /** @class */ (function () {
    function SingleMoviePage(provider, thisRoute, renderer) {
        this.provider = provider;
        this.thisRoute = thisRoute;
        this.renderer = renderer;
        this.showme = false;
        this.actorshowme = false;
        this.infoshowme = false;
        this.markshowme = false;
        this.hideInfos = true;
    }
    SingleMoviePage.prototype.ngOnInit = function () {
        var _this = this;
        this.thisRoute.params.subscribe(function (params) {
            _this.id = params.id;
            _this.provider.GetSingleMovie(_this.id).then(function (data) {
                _this.movie = data;
                _this.provider.GetPoster(_this.id).then(function (url) {
                    _this.poster = "url(" + url + ")";
                }).catch(function (err) {
                    _this.poster = "url(" + _this.movie.Poster + ")";
                });
                if (_this.movie.Type == "series") {
                    _this.provider.GetSeasons(_this.id, _this.movie.totalSeasons).then(function (data) {
                        _this.movie.Seasons = data;
                        for (var _i = 0, _a = _this.movie.Seasons; _i < _a.length; _i++) {
                            var season = _a[_i];
                            console.log(season.Title);
                        }
                    });
                }
                var nbFullStar = Math.floor(_this.movie.imdbRating);
                var nbHalfStar = Math.ceil(_this.movie.imdbRating - nbFullStar);
                var nbEmptyStar = 10 - (nbFullStar + nbHalfStar);
                _this.rating = Array(10).fill(1, 0, nbFullStar).fill(2, nbFullStar, nbFullStar + nbHalfStar).fill(3, 10 - nbEmptyStar, 10);
                console.log(_this.rating);
            });
        });
    };
    SingleMoviePage.prototype.fadeCard = function () {
        console.log(this.singleMovieCard);
        this.hideInfos = !this.hideInfos;
        if (!this.hideInfos) {
            this.renderer.setElementStyle(this.singleMovieCard.nativeElement, 'opacity', '0');
            this.renderer.setElementStyle(this.hideButton.nativeElement, 'background-color', 'transparent');
        }
        else {
            this.renderer.setElementStyle(this.singleMovieCard.nativeElement, 'opacity', '1');
            this.renderer.setElementStyle(this.hideButton.nativeElement, 'background-color', 'white');
        }
    };
    __decorate([
        ViewChild("singleMovieCard"),
        __metadata("design:type", Object)
    ], SingleMoviePage.prototype, "singleMovieCard", void 0);
    __decorate([
        ViewChild("hideButton"),
        __metadata("design:type", Object)
    ], SingleMoviePage.prototype, "hideButton", void 0);
    SingleMoviePage = __decorate([
        Component({
            selector: 'app-single-movie',
            templateUrl: './single-movie.page.html',
            styleUrls: ['./single-movie.page.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [MovieProviderService, ActivatedRoute, Renderer])
    ], SingleMoviePage);
    return SingleMoviePage;
}());
export { SingleMoviePage };
//# sourceMappingURL=single-movie.page.js.map