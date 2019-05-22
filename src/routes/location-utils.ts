let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export class LocationUtils{
    static httpGet(theUrl: string) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }
}
