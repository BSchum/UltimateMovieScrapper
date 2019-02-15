var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var URLCallerHelper = /** @class */ (function () {
    function URLCallerHelper(http) {
        this.http = http;
    }
    URLCallerHelper.prototype.Get = function (url, type) {
        var _this = this;
        if (type === void 0) { type = 'json'; }
        return new Promise(function (resolve, reject) {
            _this.http.get(url, { responseType: type }).subscribe(function (data) {
                console.log("resolve UrlCallerhelper");
                resolve(data);
            }, function (err) {
                console.log("reject UrlCallerHelper");
                reject(err);
            });
        });
    };
    URLCallerHelper = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], URLCallerHelper);
    return URLCallerHelper;
}());
export { URLCallerHelper };
//# sourceMappingURL=URLCallerHelper.js.map