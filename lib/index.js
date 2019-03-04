"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var weather_1 = require("./routes/weather");
var crowded_places_1 = require("./routes/crowded-places");
var repository_1 = require("./dal/repository");
// import {TimesWithoutMovement} from "./routes/times-without-movement";
// import {TimeOutsideTheHouse} from "./routes/time-outside-the-house";
// import {LocationUtils} from "./routes/location-utils";
var places = __importStar(require("./places.json"));
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var weatherRoute = new weather_1.weather();
var crowdedPlaces = new crowded_places_1.CrowdedPlaces();
// let timesWithoutMovement = new TimesWithoutMovement();
// let timesOutsideTheHouse = new TimeOutsideTheHouse();
// let locationUtils = new LocationUtils();
var rep = new repository_1.repository();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/weatherPreferences', function (req, res) {
    res.send(weatherRoute.getWeatherPreferences());
});
app.post('/weather', function (req, res) {
    var lon;
    var lat;
    var weatherTriggers;
    // console.log(req);
    if (req.body.coords.lat) {
        lat = req.body.coords.lat;
        console.log(lat);
    }
    if (req.body.coords.long) {
        lon = req.body.coords.long;
        console.log(lon);
    }
    if (req.body.weatherTriggers) {
        weatherTriggers = req.body.weatherTriggers;
        console.log(weatherTriggers);
    }
    var response = weatherRoute.handleWeather(lon, lat, weatherTriggers);
    console.log("severity");
    res.send({ "severity": response });
});
app.get('/crowdedPlaces', function (req, res) {
    var result = crowdedPlaces.getSeverityOfLocation(req.query.lat, req.query.lng, req.query.triggeringPlacesTypes.split(','));
    res.send({ "severity": result });
});
app.get('/placesTypes', function (req, res) {
    res.send(places);
});
// app.get('/timeWithoutMovement', function (req:any, res: any) {
//     let result = timesWithoutMovement.isNotMovingForMoreTimeThanRecommended(req.query.lat,req.query.lng, req.query.userId);
//     res.send({"severity": result});
// });
// app.get('/timeOutsideTheHouse', function (req:any, res: any) {
//     let result = timesOutsideTheHouse.isAwayFromHomeMoreThanMaxRecommended(req.query.lat,req.query.lng, req.query.userId);
//     res.send({"severity": result});
// });
//
// app.post('/createUser',function(request:any,response:any){
//     let homeLocation = locationUtils.getAddress(request.body.homeLocation);
//     let currentLocation = request.body.currentLocation;
//     let userId = request.body.userId;
//     let maxHoursOutside = request.body.maxHoursOutside;
//     let maxHoursWithoutMovement = request.body.maxHoursWithoutMovement;
//     rep.createUser(userId, currentLocation, Date.now(), homeLocation, maxHoursWithoutMovement, maxHoursOutside);
// });
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
