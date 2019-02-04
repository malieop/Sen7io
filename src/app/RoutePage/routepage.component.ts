import { Component, NgModule , EventEmitter, OnInit, OnChanges, Input } from '@angular/core';
import { DataService } from '../app.service';

@Component({
  selector: 'app-routepage-component',
  templateUrl: './routepage.component.html',
  styleUrls: ['./routepage.component.css']
})

export class RoutePageComponent {
  // variaveis
  add_route: boolean;
  show_route: boolean;

  constructor(private dataservice: DataService) {}
  ngOnInit() {
    this.dataservice.current_map_boolean.subscribe(
      data => (this.add_route = data)
    );
    this.dataservice.changeWeekday(2);
    this.dataservice.current_showRoutes.subscribe(
      data => (this.show_route = data)
    );
  }

  changeDay(day: number) {

    // muda a variavel do dataservice para o dia pretendido
    this.dataservice.changeWeekday(day);

    // apenas para fazer desaparecer o mapa caso o utilizador estivesse a adicionar algo
    // e depois fazer aparecer a tabela das rotas outra vez
    if (this.add_route === true) {
      this.dataservice.changeMapBoolean();
    }
    if (this.show_route === false) {
      this.dataservice.changeShowRoutes();
    }
    this.dataservice.getRoutes(day);
  }

}
