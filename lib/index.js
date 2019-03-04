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
var places = __importStar(require("./places.json"));
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var weatherRoute = new weather_1.weather();
var crowdedPlaces = new crowded_places_1.CrowdedPlaces();
var dalUser = new repository_1.repository();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/weatherPreferences', function (req, res) {
    res.send(weatherRoute.getWeatherPreferences());
});
app.get('/weather', function (req, res) {
    var lon;
    var lat;
    if (req.query.lon) {
        lon = req.query.lon;
    }
    if (req.query.lat) {
        lat = req.query.lat;
    }
    var response = weatherRoute.handleWeather(lon, lat);
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
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
