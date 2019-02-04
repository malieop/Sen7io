import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coord } from './Components/map.model';
import { Routes } from './Rotas/rotas.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
  // params: HttpParams;
  weekday_aux: string;
  // variaveis para o mapa aparecer e desaparecer
  private map_boolean = new BehaviorSubject<boolean>(false);
  current_map_boolean = this.map_boolean.asObservable();

  // Coordenadas para a localização do mapa

  private map_lat: number;
  private map_lng: number;

  // variaveis para passar as coordenadas para a BD e da BD para o Angular
  private Coordinates: Coord;
  private coords: Coord[] = [];

  // array de objetos Routes para guardar as rotas de cada dia para depois inserir na DB
  private routes_monday: Routes[] = [];
  private routes_tuesday: Routes[] = [];
  private routes_wednesday: Routes[] = [];
  private routes_thursday: Routes[] = [];
  private routes_friday: Routes[] = [];
  private routes_saturday: Routes[] = [];
  private routes_sunday: Routes[] = [];
  private routes_list:  Routes[] = [];
  private current_routes = new Subject<Routes[]>();

  // private route: Routes;
  // variaveis para decidir que tabela de que dia mostrar
  private weekday = new BehaviorSubject<number>(1);
  current_weekday = this.weekday.asObservable();

  // variaveis para permitir mudar a tabela

  private showRoutes = new BehaviorSubject<boolean>(true);
  current_showRoutes = this.showRoutes.asObservable();

  // variaveis do token
  private token: string;
  private tokenTimer: any;
  url = 'http://localhost:3000/api/coord/';

  getRoutes(Weekday: any) {
    /*this.http.get<{routes: Routes[]}>('http://localhost:3000/api/routes/' + Weekday)// adiciona no url o dia da semana
   .subscribe((routesData) => {
     this.routes = routesData.routes;
     this.current_routes.next(...[this.routes]);
   });*/
  }
  getCurrentRoutes() {
    return this.current_routes.asObservable();
  }

  constructor(private http: HttpClient) {}
  changeMapBoolean() {
    this.map_boolean.next(!this.map_boolean.value);
    // this.getRoutes(this.getWeekday);
  }

  addRouteList(route: Routes) {
    for (const routeList of this.routes_list) {
      if (route.origem_lng === routeList.origem_lng && route.origem_lat === routeList.origem_lat && route.distance === routeList.distance) {
        console.log('nao devia adicionar rota');
        return;
      }
    }

    this.routes_list.push(route);
  }
  setCoordinates(coordinates: Coord) {
    /*this.http.post<{message: string}>('http://localhost:3000/api/coord', this.Coordinates)
    .subscribe((responseData) => {
      console.log(responseData.message);
    });*/
    this.http
      .get<{ routes: Routes }>(
        this.url +
          String(coordinates.origem_lat) +
          '/' +
          +String(coordinates.origem_lng) +
          '/' +
          String(coordinates.destiny_lat) +
          '/' +
          String(coordinates.destiny_lng)
      )
      .subscribe(responseData => {
        console.log(responseData.routes);
        const rota: Routes = {
          origin: String(responseData.routes.origin),
          destination: String(responseData.routes.destination),
          origem_lat: String(coordinates.origem_lat),
          origem_lng: String(coordinates.origem_lng),
          destiny_lat: String(coordinates.destiny_lat),
          destiny_lng: String(coordinates.destiny_lng),
          distance: responseData.routes.distance,
          duration: responseData.routes.duration,
          mode: responseData.routes.mode,
          weekday: String(coordinates.weekday),
          car_persons: coordinates.car_people,
          purpose: coordinates.purpose
        };
        console.log(rota);
        const day = Number(this.getWeekday()); // para nao dar problema de compatibilidade
        switch (day) {
          case 2: {
            this.routes_monday.push(rota);
            this.current_routes.next(...[this.routes_monday]);
            this.addRouteList(rota);
            console.log('cheguei aqui');
            break;
          }
          case 3: {
            this.routes_tuesday.push(rota);
            this.current_routes.next(...[this.routes_tuesday]);
            this.addRouteList(rota);

            break;
          }
          case 4: {
            this.routes_wednesday.push(rota);
            this.current_routes.next(...[this.routes_wednesday]);
            this.addRouteList(rota);

            break;
          }
          case 5: {
            this.routes_thursday.push(rota);
            this.current_routes.next(...[this.routes_thursday]);
            this.addRouteList(rota);

            break;
          }
          case 6: {
            this.routes_friday.push(rota);
            this.current_routes.next(...[this.routes_friday]);
            this.addRouteList(rota);

            break;
          }
          case 7: {
            this.routes_saturday.push(rota);
            this.current_routes.next(...[this.routes_saturday]);
            this.addRouteList(rota);

            break;
          }
          case 8: {
            this.routes_sunday.push(rota);
            this.current_routes.next(...[this.routes_sunday]);
            this.addRouteList(rota);

            break;
          }
        }
        /*this.routes.push(rota);
      console.log(this.routes);
      this.current_routes.next(...[this.routes]);
      console.log(this.routes);
      console.log(this.current_routes);*/
      });
  }

  showRouteList() {
    console.log(this.routes_list);
  }
  changeWeekday(day: any) {
    this.weekday = day;
    // console.log(this.weekday);
    switch (day) {
      case 2: {
        this.current_routes.next(...[this.routes_monday]);
        break;
      }
      case 3: {
        this.current_routes.next(...[this.routes_tuesday]);
        break;
      }
      case 4: {
        this.current_routes.next(...[this.routes_wednesday]);
        break;
      }
      case 5: {
        this.current_routes.next(...[this.routes_thursday]);
        break;
      }
      case 6: {
        this.current_routes.next(...[this.routes_friday]);
        break;
      }
      case 7: {
        this.current_routes.next(...[this.routes_saturday]);
        break;
      }
      case 8: {
        this.current_routes.next(...[this.routes_sunday]);
        break;
      }
      default: {
        this.current_routes.next(...[this.routes_monday]);
        break;
      }
    }
  }
  getWeekday() {
    return this.weekday;
  }

  changeShowRoutes() {
    this.showRoutes.next(!this.showRoutes.value);
    console.log(this.showRoutes);
  }
  getShowRoutes() {
    return this.showRoutes;
  }
  addEqualRoute(i: number) {
    const day = Number(this.getWeekday()); // para nao dar problema de compatibilidade
    switch (day) {
      case 2: {
        this.routes_monday.push(this.routes_monday[i]);
        this.current_routes.next(...[this.routes_monday]);
        break;
      }
      case 3: {
        this.routes_tuesday.push(this.routes_tuesday[i]);
        this.current_routes.next(...[this.routes_tuesday]);
        break;
      }
      case 4: {
        this.routes_wednesday.push(this.routes_wednesday[i]);
        this.current_routes.next(...[this.routes_wednesday]);
        break;
      }
      case 5: {
        this.routes_thursday.push(this.routes_thursday[i]);
        this.current_routes.next(...[this.routes_thursday]);
        break;
      }
      case 6: {
        this.routes_friday.push(this.routes_friday[i]);
        this.current_routes.next(...[this.routes_friday]);
        break;
      }
      case 7: {
        this.routes_saturday.push(this.routes_saturday[i]);
        this.current_routes.next(...[this.routes_saturday]);
        break;
      }
      case 8: {
        this.routes_sunday.push(this.routes_sunday[i]);
        this.current_routes.next(...[this.routes_sunday]);
        break;
      }
    }
  }
  addBackRoute(i: number) {
    const day = Number(this.getWeekday()); // para nao dar problema de compatibilidade
    switch (day) {
      case 2: {
        const route: Routes = {
          origin: this.routes_monday[i].destination,
          origem_lat: this.routes_monday[i].destiny_lat,
          origem_lng: this.routes_monday[i].destiny_lng,
          destination: this.routes_monday[i].origin,
          destiny_lat: this.routes_monday[i].origem_lat,
          destiny_lng: this.routes_monday[i].origem_lng,
          distance: this.routes_monday[i].distance,
          duration: this.routes_monday[i].duration,
          mode: this.routes_monday[i].mode,
          weekday: this.routes_monday[i].weekday,
          car_persons: this.routes_monday[i].car_persons,
          purpose: this.routes_monday[i].purpose
        };
        this.routes_monday[i] = route;
        this.current_routes.next(...[this.routes_monday]);
        break;
      }
      case 3: {
        const route: Routes = {
          origin: this.routes_tuesday[i].destination,
          origem_lat: this.routes_tuesday[i].destiny_lat,
          origem_lng: this.routes_tuesday[i].destiny_lng,
          destination: this.routes_tuesday[i].origin,
          destiny_lat: this.routes_tuesday[i].origem_lat,
          destiny_lng: this.routes_tuesday[i].origem_lng,
          distance: this.routes_tuesday[i].distance,
          duration: this.routes_tuesday[i].duration,
          mode: this.routes_tuesday[i].mode,
          weekday: this.routes_tuesday[i].weekday,
          car_persons: this.routes_tuesday[i].car_persons,
          purpose: this.routes_tuesday[i].purpose
        };
        this.routes_tuesday[i] = route;
        this.current_routes.next(...[this.routes_tuesday]);
        break;
      }
      case 4: {
        const route: Routes = {
          origin: this.routes_wednesday[i].destination,
          origem_lat: this.routes_wednesday[i].destiny_lat,
          origem_lng: this.routes_wednesday[i].destiny_lng,
          destination: this.routes_wednesday[i].origin,
          destiny_lat: this.routes_wednesday[i].origem_lat,
          destiny_lng: this.routes_wednesday[i].origem_lng,
          distance: this.routes_wednesday[i].distance,
          duration: this.routes_wednesday[i].duration,
          mode: this.routes_wednesday[i].mode,
          weekday: this.routes_wednesday[i].weekday,
          car_persons: this.routes_wednesday[i].car_persons,
          purpose: this.routes_wednesday[i].purpose
        };
        this.routes_wednesday[i] = route;
        this.current_routes.next(...[this.routes_wednesday]);
        break;
      }
      case 5: {
        const route: Routes = {
          origin: this.routes_thursday[i].destination,
          origem_lat: this.routes_thursday[i].destiny_lat,
          origem_lng: this.routes_thursday[i].destiny_lng,
          destination: this.routes_thursday[i].origin,
          destiny_lat: this.routes_thursday[i].origem_lat,
          destiny_lng: this.routes_thursday[i].origem_lng,
          distance: this.routes_thursday[i].distance,
          duration: this.routes_thursday[i].duration,
          mode: this.routes_thursday[i].mode,
          weekday: this.routes_thursday[i].weekday,
          car_persons: this.routes_thursday[i].car_persons,
          purpose: this.routes_thursday[i].purpose
        };
        this.routes_thursday[i] = route;
        this.current_routes.next(...[this.routes_thursday]);
        break;
      }
      case 6: {
        const route: Routes = {
          origin: this.routes_friday[i].destination,
          origem_lat: this.routes_friday[i].destiny_lat,
          origem_lng: this.routes_friday[i].destiny_lng,
          destination: this.routes_friday[i].origin,
          destiny_lat: this.routes_friday[i].origem_lat,
          destiny_lng: this.routes_friday[i].origem_lng,
          distance: this.routes_friday[i].distance,
          duration: this.routes_friday[i].duration,
          mode: this.routes_friday[i].mode,
          weekday: this.routes_friday[i].weekday,
          car_persons: this.routes_friday[i].car_persons,
          purpose: this.routes_friday[i].purpose
        };
        this.routes_friday[i] = route;
        this.current_routes.next(...[this.routes_friday]);
        break;
      }
      case 7: {
        const route: Routes = {
          origin: this.routes_saturday[i].destination,
          origem_lat: this.routes_saturday[i].destiny_lat,
          origem_lng: this.routes_saturday[i].destiny_lng,
          destination: this.routes_saturday[i].origin,
          destiny_lat: this.routes_saturday[i].origem_lat,
          destiny_lng: this.routes_saturday[i].origem_lng,
          distance: this.routes_saturday[i].distance,
          duration: this.routes_saturday[i].duration,
          mode: this.routes_saturday[i].mode,
          weekday: this.routes_saturday[i].weekday,
          car_persons: this.routes_saturday[i].car_persons,
          purpose: this.routes_saturday[i].purpose
        };
        this.routes_saturday[i] = route;
        this.current_routes.next(...[this.routes_saturday]);
        break;
      }
      case 8: {
        const route: Routes = {
          origin: this.routes_sunday[i].destination,
          origem_lat: this.routes_sunday[i].destiny_lat,
          origem_lng: this.routes_sunday[i].destiny_lng,
          destination: this.routes_sunday[i].origin,
          destiny_lat: this.routes_sunday[i].origem_lat,
          destiny_lng: this.routes_sunday[i].origem_lng,
          distance: this.routes_sunday[i].distance,
          duration: this.routes_sunday[i].duration,
          mode: this.routes_sunday[i].mode,
          weekday: this.routes_sunday[i].weekday,
          car_persons: this.routes_sunday[i].car_persons,
          purpose: this.routes_sunday[i].purpose
        };
        this.routes_sunday[i] = route;
        this.current_routes.next(...[this.routes_sunday]);
        break;
      }
    }
  }
  deleteRoute(i: number) {
    const day = Number(this.getWeekday()); // para nao dar problema de compatibilidade
    switch (day) {
      case 2: {
        this.routes_monday.splice(i, 1);
        this.current_routes.next(...[this.routes_monday]);
        break;
      }
      case 3: {
        this.routes_tuesday.push(this.routes_tuesday[i]);
        this.current_routes.next(...[this.routes_tuesday]);
        break;
      }
      case 4: {
        this.routes_wednesday.push(this.routes_wednesday[i]);
        this.current_routes.next(...[this.routes_wednesday]);
        break;
      }
      case 5: {
        this.routes_thursday.push(this.routes_thursday[i]);
        this.current_routes.next(...[this.routes_thursday]);
        break;
      }
      case 6: {
        this.routes_friday.push(this.routes_friday[i]);
        this.current_routes.next(...[this.routes_friday]);
        break;
      }
      case 7: {
        this.routes_saturday.push(this.routes_saturday[i]);
        this.current_routes.next(...[this.routes_saturday]);
        break;
      }
      case 8: {
        this.routes_sunday.push(this.routes_sunday[i]);
        this.current_routes.next(...[this.routes_sunday]);
        break;
      }
    }
  }


  setMapCoordinates(lat: number, lng: number) {
    this.map_lat = lat;
    this.map_lng = lng;
  }
  getMapCoordinates() {
    return [this.map_lat, this.map_lng];
  }

  gatherRoutes() {
    const routes: Routes[] = [];

    for (const route of this.routes_monday) {
      routes.push(route);
    }
    for (const route of this.routes_tuesday) {
      routes.push(route);
    }
    for (const route of this.routes_wednesday) {
      routes.push(route);
    }
    for (const route of this.routes_thursday) {
      routes.push(route);
    }
    for (const route of this.routes_friday) {
      routes.push(route);
    }
    for (const route of this.routes_saturday) {
      routes.push(route);
    }
    for (const route of this.routes_sunday) {
      routes.push(route);
    }
    return routes;
  }

  // Guardar as rotas na DB

  submitRoutes() {
    for (const route of this.gatherRoutes()) {
    this.http
      .post<{ message: string }>(this.url + 'submitRoutes', route)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
    }
  }

  // TOKEN CREATION
  /*
  tokenCreation() {
    const url = 'http://localhost:3000';
    this.http
      .get<{ token: string; expiresIn: number }>(url + '/api/token')
      .subscribe(response => {
        const expiresInDuration = response.expiresIn;
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, expiresInDuration * 1000);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        console.log(expirationDate);
        this.saveAuthData(this.token, expirationDate);
        console.log(response);
      });
  }

  logout() {
    this.token = null;
    this.clearAuthData();
    // clearTimeout(this.tokenTimer); // quando houver logi
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }*/
}
