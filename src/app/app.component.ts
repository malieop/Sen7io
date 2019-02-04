import { Component, NgModule, OnInit } from '@angular/core';
import { module } from 'angular';
import { AgmMarker } from '@agm/core';
import { DataService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataservice: DataService) {}

  show_routepage = false;
  show_homepage = true;
  show_housepage = false;
  show_signup = false;
  show_login = false;

  weekbar: boolean;
  latitude: number;
  longitude: number;



  ngOnInit() {
    // this.dataservice.tokenCreation();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.setPosition(pos));
  }

}
  changeMenu(menu: number) {
    switch (menu) {
      case 1: {
        this.show_routepage = false;
        this.show_homepage = true;
        this.show_housepage = false;
        this.show_signup = false;
        this.show_login = false;
        break;
      }
      case 2: {
        this.show_routepage = true;
        this.show_homepage = false;
        this.show_housepage = false;
        this.show_signup = false;
        this.show_login = false;
        break;
      }
      case 3: {
        this.show_routepage = false;
        this.show_housepage = true;
        this.show_homepage = false;
        this.show_signup = false;
        this.show_login = false;

        break;
      }
      case 4: {
        this.show_homepage = false;
        this.show_routepage = false;
        this.show_housepage = false;
        this.show_signup = false;
        this.show_login = true;
        break;
      }
      case 5: {
        this.show_homepage = false;
        this.show_routepage = false;
        this.show_housepage = false;
        this.show_signup = true;
        this.show_login = false;
        break;
      }

      default: {
        this.show_homepage = true;
        this.show_routepage = false;
        this.show_housepage = false;
        this.show_signup = false;
        this.show_login = false;
        break;
      }
    }
  }

  setPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.dataservice.setMapCoordinates(this.latitude , this.longitude);
  }
}
