var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
            _this.caller.Get(MovieProviderService_1.API_URL + "?apikey=" + MovieProviderService_1.API_KEY + "&s=\"" + search + "\"&type=movie").then(function (data) {
                resolve(data);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    MovieProviderService.prototype.GetSeries = function (search) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.caller.Get(MovieProviderService_1.API_URL + "?apikey=" + MovieProviderService_1.API_KEY + "&s=\"" + search + "\"&type=series").then(function (data) {
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
            _this.caller.Get(MovieProviderService_1.API_URL + "?apikey=" + MovieProviderService_1.API_KEY + "&plot=full&i=" + id).then(function (data) {
                console.log(data);
                resolve(data);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    MovieProviderService.prototype.GetPoster = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = MovieProviderService_1.IMG_API_URL + "?apiKey=" + MovieProviderService_1.API_KEY + "&i=" + id + "&h=9000";
            console.log(url);
            _this.caller.Get(url, "blob").then(function (data) {
                resolve(url);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    MovieProviderService.prototype.GetSeasons = function (id, seasonNumber) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var seasons, i, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            seasons = [];
                            i = 1;
                            _a.label = 1;
                        case 1:
                            if (!(i <= seasonNumber)) return [3 /*break*/, 4];
                            console.log(i);
                            url = MovieProviderService_1.API_URL + "?apiKey=" + MovieProviderService_1.API_KEY + "&i=" + id + "&Season=" + i;
                            return [4 /*yield*/, this.caller.Get(url).then(function (data) {
                                    seasons[i] = data;
                                }).catch(function (err) {
                                    reject(err);
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            console.log(seasons);
                            resolve(seasons);
                            return [2 /*return*/];
                    }
                });
            }); }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
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