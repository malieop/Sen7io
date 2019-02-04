import {
  Component,
  NgModule,
  EventEmitter,
  OnInit,
  OnChanges,
  Input
} from '@angular/core';
import { Routes } from './rotas.model';

import { DataService } from '../app.service';

@Component({
  selector: 'app-rotas-component',
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnChanges {
  routes: Routes[] = [];

  @Input()
  show: boolean;

  constructor(private dataservice: DataService) {}

  ngOnInit() {

    this.dataservice.getRoutes(this.dataservice.getWeekday());
    this.dataservice.getCurrentRoutes().subscribe((routes: Routes[]) => {
      this.routes = routes;
    });
    this.show = Boolean(this.dataservice.getShowRoutes());
    console.log(this.routes);
    console.log(this.dataservice.getWeekday());
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  addRoute() {
    // console.log(this.routes);
    this.dataservice.changeMapBoolean();
    this.dataservice.changeShowRoutes();
    // console.log(this.dataservice.current_map_boolean);
    // console.log(this.dataservice.getShowRoutes());
  }
  addEqualRoute(i: number) {
    console.log(i);
    this.dataservice.addEqualRoute(i);
  }
  addBackRoute(i: number) {
    console.log(i);
    this.dataservice.addBackRoute(i);
  }
  deleteRoute(i: number) {
    console.log(i);
    this.dataservice.deleteRoute(i);
  }

  // metodo auxiliar para verificar se está a adicionar no RouteList
  showRouteList() {
    this.dataservice.showRouteList();
  }
}
