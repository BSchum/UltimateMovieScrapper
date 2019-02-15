var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ActivatedRoute } from '@angular/router';
import { MovieProviderService } from './../services/movie-provider.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(provider, navCtrl, route) {
        this.provider = provider;
        this.navCtrl = navCtrl;
        this.route = route;
    }
    HomePage.prototype.OnSearch = function (search) {
        var _this = this;
        if (search != "") {
            this.route.params.subscribe(function (data) {
                if (data.id == "movies") {
                    _this.provider.GetMovies(search).then(function (data) {
                        _this.movies = data;
                        console.log(_this.movies);
                        _this.movies.Search.sort(function (a, b) {
                            return b.Year - a.Year;
                        });
                    });
                }
                else {
                    _this.provider.GetSeries(search).then(function (data) {
                        _this.movies = data;
                        console.log(_this.movies);
                        _this.movies.Search.sort(function (a, b) {
                            return b.Year - a.Year;
                        });
                    });
                }
            });
        }
    };
    HomePage.prototype.ngOnInit = function () {
        this.OnSearch("marvel");
    };
    HomePage.prototype.onInput = function (event) {
        this.OnSearch(this.searchText);
    };
    HomePage.prototype.onMovieClick = function (id) {
        this.navCtrl.navigateForward(['single-movie', { id: id }]);
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        __metadata("design:paramtypes", [MovieProviderService, NavController, ActivatedRoute])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map