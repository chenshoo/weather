//
// var request = require('request');
//
// var key = 'AIzaSyAxm42yuheNNx0znh7x4qAExlu5MMsnpPY';
//
// export class LocationUtils{
//
//     getAddress(address:string) : {lat:number, lng:number} {
//         let addressFormat = address.replace(' ',',+')
//         let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressFormat}CA&key=${key}`
//         let result = this.httpGet(url);
//         return {lat:result.latitude,lng:result.longtitude};
//     }
//
//     private httpGet(theUrl: string) {
//         let xmlHttp = new XMLHttpRequest();
//         xmlHttp.open("GET", theUrl, false); // false for synchronous request
//         xmlHttp.send(null);
//         return JSON.parse(xmlHttp.responseText);
//     }
// }
