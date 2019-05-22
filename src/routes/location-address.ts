import {LocationUtils} from "./location-utils";

export class LocationAddress {
    static getAddress(apiKey:string, lat: number, lng: number): string {
        let requestString = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
        let result = LocationUtils.httpGet(requestString);
        if (result.results[0])
            return result.results[0].formatted_address;
        else return ""
    }
}