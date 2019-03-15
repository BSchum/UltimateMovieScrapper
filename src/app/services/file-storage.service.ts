import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private fileTransfer: FileTransfer, private file : File, private permissions: AndroidPermissions, private toast: Toast) { }
  
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
      fileTransfer.download('data:'+type+'/json;charset=utf8,' + encodeURIComponent(fileToImport), this.file.externalRootDirectory+"Download/favorites."+extension).then(() => {
        this.toast.show("Fichier exporté", 'short', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    });
  }

  importFile(){
    return new Promise((resolve, reject) => {
      this.AskPermission(this.permissions.PERMISSION.READ_EXTERNAL_STORAGE).then(() => {
        this.file.readAsText(this.file.externalRootDirectory + "Download/", "favorites.json").then((string) => {
          resolve(JSON.parse(string));
        });
      });
    });
  }
}
