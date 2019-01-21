var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SingleMoviePage } from './single-movie.page';
import { HttpClient } from '@angular/common/http';
import { MovieProviderService } from './../services/movie-provider.service';
import { URLCallerHelper } from './../helpers/URLCallerHelper';
import { HttpClientModule } from '@angular/common/http';
var routes = [
    {
        path: '',
        component: SingleMoviePage
    }
];
var SingleMoviePageModule = /** @class */ (function () {
    function SingleMoviePageModule() {
    }
    SingleMoviePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                HttpClientModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SingleMoviePage],
            providers: [MovieProviderService, URLCallerHelper, HttpClient]
        })
    ], SingleMoviePageModule);
    return SingleMoviePageModule;
}());
export { SingleMoviePageModule };
//# sourceMappingURL=single-movie.module.js.map