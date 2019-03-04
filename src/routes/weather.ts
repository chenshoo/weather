import {findFamily, preferencesFileds} from "../definitions";

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let relevant: number = 1;
let lowTemp: number = 15;
let highTemp: number = 30;
let maximumSeverity: number = 10;

const apiKey = '19a439ed33e3f1ac4303c9fba5229ba6';
//
// let preferences: ObjectNumber = {
//     Thunderstorm: 3,
//     Rain: 2,
//     Snow: 0,
//     Atmosphere: 0,
//     Cloudy: 2,
//     Sunny: 0,
//     Hot: 0,
//     Cold: 4
// };

export class weather {
    constructor() {
    };

    handleWeather(lon: any, lat: any, preferences: any) {
        let body = this.getWeatherByLocation(lon, lat);
        const ids = body.weather.map((item: any) => item.id);
        let temperature = body.main.temp;
        return this.calculateWeatherStatus(ids, temperature, preferences);
    }

    private getWeatherByLocation(lon: any, lat: any) {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }

    private calculateWeatherStatus(weatherIds: number[], temp: number, preferences: any): number {
        let weatherWeight: number = 0;

        // calculate weather condition
        weatherIds.forEach((id: number) => {
            let family: string = findFamily(id);

            let rate = preferences.filter((item: any) => item.type === family);


            // check if family is relevant
            if (rate.length) {
                console.log(rate);
                weatherWeight += rate[0].rate;
                // console.log(weatherWeight);
            }
        });

        // calculate temp
        let tempWeight: number = 0;
        if (temp <= lowTemp) {
            tempWeight = preferences["Cold"];
        } else if (temp > highTemp) {
            tempWeight = preferences["Hot"];
        }

        // calculate total status
        let normalizeNumber = 0.67;
        let status: number = (weatherWeight + tempWeight) * normalizeNumber;
        if (status > maximumSeverity) {
            status = maximumSeverity;
        }

        return status || 0;
    }

    getWeatherPreferences() {
        return preferencesFileds;
    }
}

