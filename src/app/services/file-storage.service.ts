import { Platform } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Injectable, PlatformRef } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import * as converter  from 'json-2-csv';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  isNative : boolean;
  constructor(private fileTransfer: FileTransfer, 
              private file : File,
              private filePath : FilePath,
              private fileChooser : FileChooser, 
              private permissions: AndroidPermissions, 
              private toast: Toast, 
              private sanitization: DomSanitizer) 
  {
  }
  GetDataUrl(file, type){
    return new Promise((resolve, reject) => {
      if(type == "json"){
        var url = 'data:text/json;charset=utf8;base64,' + btoa(JSON.stringify(file));
        var safeUrl = this.sanitization.bypassSecurityTrustUrl(url);
        resolve(safeUrl);
      }else if(type == "csv"){
        converter.json2csv(file, (err, csv) => {
          var url ='data:text/csv;charset=utf8;base64,' + btoa(csv);
          var safeUrl = this.sanitization.bypassSecurityTrustUrl(url);
          resolve(safeUrl);
        });
      }
    });
  }
  AskPermission(permission: string){
    return new Promise((resolve, reject) => {
      this.permissions.checkPermission(permission).then(
        result => {
          if(!result.hasPermission){
           resolve(this.permissions.requestPermission(permission));
          }
          else{
            resolve();
          }
      });
    });
  }

  exportFile(fileToImport: string, type: string, extension: string){
    
    this.AskPermission(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(() => {      
      const fileTransfer: FileTransferObject = this.fileTransfer.create();
      fileTransfer.download('data:'+type+'/csv;charset=utf8,' + encodeURIComponent(fileToImport), this.file.externalRootDirectory+"Download/favorites."+extension).then(() => {
        this.toast.show("Fichier exporté: favorites."+extension, 'short', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    });
  }

  importFile(){
    return new Promise((resolve, reject) => {
      this.fileChooser.open()
      .then(uri => 
        this.filePath.resolveNativePath(uri).then((nativePath) => {
          let path = nativePath.substring(0, nativePath.lastIndexOf('/'));
          let file = nativePath.substring(nativePath.lastIndexOf('/')+1, nativePath.length);

          if(file.endsWith(".json"))
          {
            this.file.readAsText(path, file).then((fileAsText) => {
              var parsedFavorites = JSON.parse(fileAsText);
              resolve(parsedFavorites);
            });
          }
          else if(file.endsWith(".csv"))
          {
            this.file.readAsText(path, file).then((fileAsText) => {
              converter.csv2json(fileAsText, (err, file) => {
                var parsedFavorites = file;
                resolve(parsedFavorites);
              }, {});
            });
          }
          else
          {
            this.toast.show("Le fichier n'est pas au bon format", 'short', 'bottom').subscribe(
              toast => {
                console.log(toast);
              });            
            reject("Le fichier n'est pas au bon format");
          }
      }));
    });
  }
}
