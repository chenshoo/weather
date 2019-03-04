import {repository} from "../dal/repository";

const Distance = require('geo-distance');
const radius = 10;
let rep = new repository();
export class TimesWithoutMovement {
    isNotMovingForMoreTimeThanRecommended(lat: number, lon: number, userId: string): boolean {
        let lastLocation = rep.getLastLocByUserId(userId);
        let maxHours = rep.getMaxTimeWithoutMovementByUserId(userId);
        if (Distance.between(lastLocation, {lat, lon}) > radius) {
            rep.updateLastLocation(userId, [lat, lon]);
            return false;
        }
        let lastTimeOfLocation = rep.getLastTimeMovedByUserId(userId);
        let currentTime = Date.now();
        if (currentTime - lastTimeOfLocation > maxHours) {
            return true;
        }
        return false;
    }

}

