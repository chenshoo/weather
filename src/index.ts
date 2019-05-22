import {LocationInformation} from "./routes/location-information";
let express = require("express");
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/locationData', async function (req: any, res: any) {
    await res.send({"locationData": await LocationInformation.getLocationData(req.query.apiKey, req.query.lat, req.query.lng, 100)});
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});