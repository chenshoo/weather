import {weather} from "./routes/weather";
import {CrowdedPlaces} from "./routes/crowded-places";
import {repository} from "./dal/repository";
import {TimesWithoutMovement} from "./routes/times-without-movement";
import {TimeOutsideTheHouse} from "./routes/time-outside-the-house";
import {LocationUtils} from "./routes/location-utils";


import * as places from "./places.json";
let express = require("express");
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();

let weatherRoute = new weather();
let crowdedPlaces = new CrowdedPlaces();
let timesWithoutMovement = new TimesWithoutMovement();
let timesOutsideTheHouse = new TimeOutsideTheHouse();
let locationUtils = new LocationUtils();
let rep = new repository();


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
    let result = crowdedPlaces.getSeverityOfLocation(req.query.lat,req.query.lng, req.query.triggeringPlacesTypes.split(','));
    res.send({"severity": result});
});
app.get('/placesTypes', function (req:any, res: any) {
    res.send(places);
});
app.get('/timeWithoutMovement', function (req:any, res: any) {
    let result = timesWithoutMovement.isNotMovingForMoreTimeThanRecommended(req.query.lat,req.query.lng, req.query.userId);
    res.send({"severity": result});
});
app.get('/timeOutsideTheHouse', function (req:any, res: any) {
    let result = timesOutsideTheHouse.isAwayFromHomeMoreThanMaxRecommended(req.query.lat,req.query.lng, req.query.userId);
    res.send({"severity": result});
});

app.post('/createUser',function(request:any,response:any){
    let homeLocation = locationUtils.getAddress(request.body.homeLocation);
    let currentLocation = request.body.currentLocation;
    let userId = request.body.userId;
    let maxHoursOutside = request.body.maxHoursOutside;
    let maxHoursWithoutMovement = request.body.maxHoursWithoutMovement;
    rep.createUser(userId, currentLocation, Date.now(), homeLocation, maxHoursWithoutMovement, maxHoursOutside);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});