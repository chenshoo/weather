"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weather_1 = require("./routes/weather");
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var weatherRoute = new weather_1.weather();
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
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
