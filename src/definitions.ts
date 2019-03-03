export type ObjectNumber = {[key: string]: number};

export const familyToWeight: ObjectNumber = {
    Thunderstorm: 7,
    Rain: 5,
    Snow: 3,
    Atmosphere: 4,
    Cloudy: 2,
    Sunny: 0,
    Hot: 3,
    Cold: 6
};


export function findFamily(idWeather : number) : string {
    let prefix: string;
    prefix = idWeather.toString()[0];

    switch (prefix) {
        case "2": {
            return "Thunderstorm";
        }
        case "3": {
            return "Rain";
        }
        case "5": {
            return "Rain";
        }
        case "6": {
            return "Snow";
        }
        case "7": {
            return "Atmosphere";
        }
        case "8": {
            return "Cloudy";
        }
        default: {
            console.log("could not find family to id " + idWeather + ", return sunny");
            return "Sunny";
        }
    }
}




