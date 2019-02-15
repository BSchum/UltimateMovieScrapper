import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, IonTabBar } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  isMovieList: boolean;
  @ViewChild("menu") paymentTabs: IonTabBar;


  constructor() { }

  ngOnInit() {
    this.isMovieList = true;
  }

}
