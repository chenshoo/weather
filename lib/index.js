"use strict";
var request = require('request');
var apiKey = '19a439ed33e3f1ac4303c9fba5229ba6';
var lat = 35;
var lon = 139;
var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
request(url, function (err, response, body) {
    if (err) {
        console.log('error:', err);
    }
    else {
        console.log('body:', body);
    }
});
// var express = require("express");
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.get('/crowdedPlaces', function (req: any, res: any) {
//     res.json(["meow"]);
// })
// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });
