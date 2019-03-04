import {weather} from "./routes/weather";
import {CrowdedPlaces} from "./routes/crowded-places";

import * as places from "./places.json";
let express = require("express");
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();

let weatherRoute = new weather();
let crowdedPlaces = new CrowdedPlaces();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/weatherPreferences', function (req:any, res:any) {
    res.send(weatherRoute.getWeatherPreferences());
})
app.get('/weather', function (req: any, res: any) {
    let lon;
    let lat;
    if(req.query.lon){
        lon = req.query.lon;
    }

    if(req.query.lat){
        lat = req.query.lat;
    }
    let response = weatherRoute.handleWeather(lon, lat);
    console.log("severity");
    res.send({"severity": response});
});

app.get('/crowdedPlaces', function (req:any, res: any) {
    let result = crowdedPlaces.getSeverityOfLocation(req.query.lat,req.query.lon, req.query.triggeringPlacesTypes.split(','));
    res.send({"severity": result});
});
app.get('/placesTypes', function (req:any, res: any) {
    res.send(places);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});