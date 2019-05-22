import {PlacesNearBy} from "./places-near-by";
import {LocationAddress} from "./location-address";
import {weather} from "./weather";
import {LocationUtils} from "./location-utils";

export class LocationInformation {
    static async getLocationData(apiKey: string, lat: number, lng: number, radius: number) {
        let requestNearByPlaces = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`;
        let resultNearByPlaces = LocationUtils.httpGet(requestNearByPlaces);
        return await {
            address: LocationAddress.getAddress(apiKey, lat, lng),
            crowdedness: await PlacesNearBy.getSeverityOfLocation(resultNearByPlaces, apiKey),
            pointsOfInterest: PlacesNearBy.getNearByPlacesNames(resultNearByPlaces),
            weather: weather.handleWeather(lng, lat)
        }
    }
}

