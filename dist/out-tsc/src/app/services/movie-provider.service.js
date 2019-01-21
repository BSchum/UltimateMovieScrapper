var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { URLCallerHelper } from './../helpers/URLCallerHelper';
import { Injectable } from '@angular/core';
var MovieProviderService = /** @class */ (function () {
    function MovieProviderService(caller) {
        this.caller = caller;
    }
    MovieProviderService_1 = MovieProviderService;
    MovieProviderService.prototype.GetMovies = function (search) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.caller.Get(MovieProviderService_1.API_URL + "?apikey=" + MovieProviderService_1.API_KEY + "&s=\"" + search + "\"").then(function (data) {
                resolve(data);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    MovieProviderService.prototype.GetSingleMovie = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(id);
            _this.caller.Get(MovieProviderService_1.API_URL + "?apikey=" + MovieProviderService_1.API_KEY + "&i=" + id).then(function (data) {
                resolve(data);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    MovieProviderService.prototype.GetMoviePoster = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(id);
            _this.caller.Get(MovieProviderService_1.IMG_API_URL + "?apikey=" + MovieProviderService_1.API_KEY + "&i=" + id).then(function (data) {
                resolve(data);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    var MovieProviderService_1;
    //TODO config
    MovieProviderService.API_URL = "http://www.omdbapi.com/";
    MovieProviderService.IMG_API_URL = "http://img.omdbapi.com/";
    MovieProviderService.API_KEY = "75522b56";
    MovieProviderService = MovieProviderService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [URLCallerHelper])
    ], MovieProviderService);
    return MovieProviderService;
}());
export { MovieProviderService };
//# sourceMappingURL=movie-provider.service.js.map