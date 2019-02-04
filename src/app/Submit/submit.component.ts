import { Component, NgModule , EventEmitter, OnInit, OnChanges, Input } from '@angular/core';
import { DataService } from '../app.service';

@Component({
  selector: 'app-submit-component',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})

export class SubmitComponent {

  routes_coords_checker = false;


  constructor(public dataservice: DataService) {}

  submitInfo () {
    console.log(this.routes_coords_checker);
    this.dataservice.submitRoutes();
  }
}
