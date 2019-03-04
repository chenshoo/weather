let mongoose = require('mongoose');
mongoose.connect('mongodb://129.213.103.20/prod', {useNewUrlParser: true});

let user: any;

export class repository {

    constructor() {
        this.init();
    };

    private init() {
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("connect to DB");
        });

        let userSchema = new mongoose.Schema({
            userId: String,
            lastLocation: {lng: Number, lat: Number},
            lastTimeMoved: Number,
            lastTimeAtHome: Number,
            homeCoords: {lng: Number, lat: Number},
            moveTimeLimit: Number,
            outsideTheHouseTimeLimit: Number
        });

        user = mongoose.model('User', userSchema);
    }

    getLastLocByUserId(userID: String) {
        return user.find({userId: userID}).select('lastLocation');
    }
    getHomeCoordsByUserId(userID: String) {
        return user.find({userId: userID}).select('homeCoords');
    }
    getMaxTimeWithoutMovementByUserId(userID: String) {
        return user.find({userId: userID}).select('moveTimeLimit');
    }
    getLastTimeAtHomeByUserId(userID: String) {
        return user.find({userId: userID}).select('lastTimeAtHome');
    }
    getOutsideTheHouseTimeLimitByUserId(userID: String) {
        return user.find({userId: userID}).select('outsideTheHouseTimeLimit');
    }
    getLastTimeMovedByUserId(userID: String) {
        return user.find({userId: userID}).select('lastTimeMoved');
    }
    getUserByUserId(userID: String) {
        return user.find({userId: userID});
    }
    updateLastTimeAtHome(userID: String){
        this.getUserByUserId(userID).then(function (data: any) {
            user.Update({userId: userID}, {
                lastLocation: data.homeCoords,
                lastTimeAtHome: Date.now()
            });
        });
    }
    updateLastLocation(userID: String, lastLocation: any){
        user.Update({userId: userID}, {
            lastLocation: lastLocation,
            lastTimeAtHome: Date.now()
        });
    }

    createUser(userId: String, lastLocation: any, lastTimeMoved: number, homeCoords: any, moveTimeLimit: number, outsideTheHouseTimeLimit: number){
        let u = new user;
        u.userId = userId;
        u.lastLocation = lastLocation;
        u.lastTimeMoved = lastTimeMoved;
        u.homeCoords = homeCoords;
        u.moveTimeLimit = moveTimeLimit;
        u.outsideTheHouseTimeLimit = outsideTheHouseTimeLimit;
        u.save();
    }
}