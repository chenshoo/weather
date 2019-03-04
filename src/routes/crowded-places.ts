let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const apiKey: string = 'AIzaSyAxm42yuheNNx0znh7x4qAExlu5MMsnpPY';
const radius: number = 50;

export class CrowdedPlaces {
    getSeverityOfLocation(lat: number, lon: number, triggeringPlacesTypes: Array<String>): number {
        let requestString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&key=${apiKey}`;
        let result = this.httpGet(requestString);
        let triggeringPlacesCounter = 0;
        result.results.map(function(x: any) {
            x.types.map(function(type:any){
                if (triggeringPlacesTypes.indexOf(type) > -1 || (type.search('store') && triggeringPlacesTypes.indexOf('store') > -1)) {
                    if ((x.opening_hours && x.opening_hours.open_now) || !x.opening_hours) {
                        triggeringPlacesCounter++;
                    }
                }
            });
        });

        return this.getSeverityByNumberOfTriggeringPlaces(triggeringPlacesCounter);
    }

    private getSeverityByNumberOfTriggeringPlaces(triggeringPlacesCounter: number): number{
        if(triggeringPlacesCounter === 0) {
            return 0;
        }
        return 6 + Math.floor(triggeringPlacesCounter/5);
    }

    private httpGet(theUrl: string) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }
}

