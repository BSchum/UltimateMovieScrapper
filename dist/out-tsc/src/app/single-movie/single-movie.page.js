var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieProviderService } from './../services/movie-provider.service';
var SingleMoviePage = /** @class */ (function () {
    function SingleMoviePage(provider, thisRoute) {
        this.provider = provider;
        this.thisRoute = thisRoute;
    }
    SingleMoviePage.prototype.ngOnInit = function () {
        var _this = this;
        this.thisRoute.params.subscribe(function (params) {
            _this.id = params.id;
            _this.provider.GetSingleMovie(_this.id).then(function (data) {
                _this.movie = data;
                console.log(_this.movie);
            });
            _this.provider.GetMoviePoster(_this.id).then(function (data) {
                _this.poster = data;
                console.log(_this.poster);
            });
        });
    };
    SingleMoviePage = __decorate([
        Component({
            selector: 'app-single-movie',
            templateUrl: './single-movie.page.html',
            styleUrls: ['./single-movie.page.scss'],
        }),
        __metadata("design:paramtypes", [MovieProviderService, ActivatedRoute])
    ], SingleMoviePage);
    return SingleMoviePage;
}());
export { SingleMoviePage };
//# sourceMappingURL=single-movie.page.js.map