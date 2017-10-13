import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Trip } from '../../models/trip.class';

@Injectable()
export class TripService {
    public trips: Trip[];
    private readonly storageKey = 'trips';

    constructor(private storage: Storage) {
        storage.get(this.storageKey).then((val) => {
            if (val == null) {
                this.trips = [];
            } else {
                this.trips = val;
            }
        });
    }

    saveTrip(trip: Trip) {
        this.trips.push(trip);
        this.storage.set(this.storageKey, this.trips);
    }
}