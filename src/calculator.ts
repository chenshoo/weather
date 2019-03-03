import {familyToWeight, findFamily, ObjectNumber} from "./definitions";
let relevant : number = 1;
let lowTemp : number = 15;
let highTemp : number = 30;

let maximumSeverity : number = 10;

/* let preferences : ObjectNumber = {
    "Thunderstorm": 1,
    "Rain": 0,
    "Snow": 0,
    "Atmosphere": 1,
    "Cloudy": 0,
    "Hot": 0,
    "Cold": 1}; */
export function calculateWeatherStatus(weatherId : number, temp : number, preferences : ObjectNumber) : number {
    // calculate weather condition
    let family: string = findFamily(weatherId);

    let weatherWeight: number = 0;

    // check if family is relevant
    if (preferences[family] === relevant) {
        weatherWeight = familyToWeight[family];
        console.log(weatherWeight);
    }

    // calculate temp
    let tempWeight : number = 0;
    if (temp <= lowTemp) {
        tempWeight = familyToWeight["Cold"];
    } else {
        if (temp > highTemp) {
            tempWeight = familyToWeight["Hot"];
        }
    }

    // calculate total status
    let status : number = weatherWeight + tempWeight;
    if (status > maximumSeverity) {
        status = maximumSeverity;
    }

    return status;
}

