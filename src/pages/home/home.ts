import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Trip } from '../../models/trip.class';
import { TripService } from '../../app/services/trip.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isTracking: boolean;
  lastLon: number;
  lastLat: number;
  currentTrip: Trip;

  constructor(
    public navCtrl: NavController, 
    private backgroundGeolocation: BackgroundGeolocation,
    private tripService: TripService
  ) {
    
    const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    
    this.backgroundGeolocation.configure(config)
    .subscribe((location: BackgroundGeolocationResponse) => {
      this.currentTrip.locations.push(location);
      if(this.lastLon != null && this.lastLat != null) {
        const distanceTravelled = this.getDistanceFromLatLonInKm(location.latitude, location.longitude, this.lastLat, this.lastLon);
        this.currentTrip.distance += distanceTravelled;
      }
      this.lastLat = location.latitude;
      this.lastLon = location.longitude;

      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.backgroundGeolocation.finish(); // FOR IOS ONLY

    });
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }

   deg2rad(deg) {
    return deg * (Math.PI/180)
   }

  startKmTracking() {
    this.isTracking = true;
    this.currentTrip = new Trip();
    this.currentTrip.startDate = new Date();
    this.backgroundGeolocation.start();
  }

  stopKmTracking() {
    this.isTracking = false;
    this.backgroundGeolocation.stop();
    this.currentTrip.endDate = new Date();
    this.tripService.saveTrip(this.currentTrip);
    
  }

}
