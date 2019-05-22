import {LocationInformation} from "./routes/location-information";
let express = require("express");
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/locationData', async function (req: any, res: any) {
    const apiKey: string = 'AIzaSyAxm42yuheNNx0znh7x4qAExlu5MMsnpPY';
    await res.send({"locationData": await LocationInformation.getLocationData(apiKey, req.query.lat, req.query.lng, 100)});
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});