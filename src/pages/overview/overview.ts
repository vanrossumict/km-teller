import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TripService } from '../../app/services/trip.service';
import { Trip } from '../../models/trip.class';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {
  public trips: Trip[];

  constructor(public navCtrl: NavController, private tripService: TripService) {
    this.trips = tripService.trips;
  }

}
