import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reject } from 'q';
@Injectable()
export class URLCallerHelper{
    constructor(public http: HttpClient){

    }
    Get(url: string, type: any = 'json'){
        return new Promise((resolve, reject) => {
            this.http.get(url, {responseType: type}).subscribe(data => {
                console.log("resolve UrlCallerhelper");
                resolve(data);
            }, err => {
                console.log("reject UrlCallerHelper");
                reject(err);
            });
        });
    }
}