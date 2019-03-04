// import {repository} from "../dal/repository";
// let rep = new repository();
// const Distance = require('geo-distance');
// const radius = 10;
//
// export class TimeOutsideTheHouse {
//
//     isAwayFromHomeMoreThanMaxRecommended(lat: number, lon: number, userId:string): boolean {
//         let homeLocation = rep.getHomeCoordsByUserId(userId);
//         if (Distance.between(homeLocation, {lat, lon}) < radius) {
//             rep.updateLastTimeAtHome(userId);
//             return false;
//         }
//         let lastTimeAtHome = rep.getLastTimeAtHomeByUserId(userId);
//         let currentTime = Date.now();
//         if (currentTime - lastTimeAtHome > rep.getOutsideTheHouseTimeLimitByUserId(userId)) {
//             return true;
//         }
//         return false;
//     }
// }
