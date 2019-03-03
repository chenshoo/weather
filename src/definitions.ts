export type ObjectNumber = { [key: string]: number };

export const preferencesFileds: any = {
    families: [{"type": "Thunderstorm", "title": "סופות רעמים"},
        {"type": "Rain", "title": "גשם"},
        {"type": "Snow", "title": "שלג"},
        {"type": "Atmosphere", "title": "מעורפל"},
        {"type": "Cloudy", "title": "מעונן"},
        {"type": "Hot", "title": "חום"},
        {"type": "Cold", "title": "קור"}],
    range: {"min": 0, "max": 5}
};

export function findFamily(idWeather: number): string {
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
            return "";
        }
    }
}




