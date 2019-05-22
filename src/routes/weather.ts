import {LocationUtils} from "./location-utils";

const apiKey = '19a439ed33e3f1ac4303c9fba5229ba6';

export class weather {
    static handleWeather(lon: any, lat: any) {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        let body = LocationUtils.httpGet(url);
        if (body.main) {
            let temperature = body.main.temp;
            console.log(`The weather is ${body.weather[0].description}, the tempature is ${temperature})`);
            return `The weather is ${body.weather[0].description}, the tempature is ${temperature})`;
        }
    }
}

