import { Component, NgModule , EventEmitter, ViewChild, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';
import { Coord } from './map.model';
import { DataService } from '../app.service';

@Component({
  providers: [ AppComponent ],
  selector: 'app-map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor (public dataservice: DataService) {}
  public origin: {};
  public destination: {};
  lat: number;
  lng: number;
  routeIntention: string;
  peopleNumber: number;

  // variaveis dos inputs (com valores para testes mais rapidos) deve ser posto => 'origin_lat: number';
  origin_lat = '0.06896870504548863';
  origin_lng = '6.557001746568176';
  destiny_lat = '0.1410990689332542';
  destiny_lng = '6.6593121357967675';
  coord_bool = true;
  origem_bool = false;
  marker_origin = false;
  origin_marker_lat: number;
  origin_marker_lng: number;
  destiny_bool = false;
  destiny_marker_lat: number;
  destiny_marker_lng: number;

  marker_destiny = false;
  Coordinates: Coord;
  people_number: number;
  label_origin = 'Origin Point';
  label_destiny = 'Destiny point';

  /*lat_map = '32.652113899999996'; //: number;
  lng_map = '-16.8746074';//: number;*/

  ngOnInit() {
    // console.log(this.dataservice.getMapCoordinates()[0]);
    this.lat = this.dataservice.getMapCoordinates()[0];
    this.lng = this.dataservice.getMapCoordinates()[1];

    /*this.lat = 32.652113899999996;
    this.lng = -16.8746074;*/
  }
  getRoute() {
    console.log('bota');
    this.coord_bool = false;

    this.origin = {
      lat: Number(this.origin_lat),
      lng: Number(this.origin_lng)
    };
    this.destination = { lat: this.destiny_lat, lng: this.destiny_lng };
    this.coord_bool = true;
    console.log(this.routeIntention);
    console.log(this.peopleNumber);

  }

  getDirection() {

    const Coordinates: Coord = {origem_lat: Number(this.origin_lat),
      origem_lng: Number(this.origin_lng),
      destiny_lat: Number(this.destiny_lat),
      destiny_lng: Number(this.destiny_lng),
      weekday: Number(this.dataservice.getWeekday()),
      car_people: this.people_number,
      purpose: this.routeIntention
    };
    console.log(this.dataservice.getWeekday());

    console.log(Coordinates);

    // metodos do componente de serviço, 1º envia as coordenadas , 2º muda a variavel para o mapa desaparecer
    this.dataservice.setCoordinates(Coordinates);
    this.dataservice.changeMapBoolean();
    this.dataservice.changeShowRoutes();

  }
  placeMarker($event) {
    if (this.origem_bool === true) {

      this.origin_marker_lat = $event.coords.lat;
      this.origin_marker_lng = $event.coords.lng;
      this.origin_lat = $event.coords.lat;
      this.origin_lng = $event.coords.lng;
      this.marker_origin = true;
    } else if (this.destiny_bool === true) {
      this.destiny_marker_lat = $event.coords.lat;
      this.destiny_marker_lng = $event.coords.lng;
      this.destiny_lat = $event.coords.lat;
      this.destiny_lng = $event.coords.lng;
      this.marker_destiny = true ;
    }
  }
}
