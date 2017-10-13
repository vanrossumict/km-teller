import { BackgroundGeolocationResponse } from "@ionic-native/background-geolocation";

export class Trip {
    constructor() {
        this.locations = [];
        this.distance = 0;
    }

    distance: number;
    startDate: Date;
    endDate: Date;
    locations: BackgroundGeolocationResponse[];
}