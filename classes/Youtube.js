var KEY_ID = 'AIzaSyC6CZXer_2wDORWvdhKQIildDG7xNoU5ec';
const https = require('https');
const GOOGLE_API = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=%s&q=%s';
const API_KEY = 'AIzaSyC6CZXer_2wDORWvdhKQIildDG7xNoU5ec';
var util = require('util');
const BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"
 


let soMany = 10;
console.log(`This is ${soMany} times easier!`);

class Youtube {
    constructor() {
    }

    search(keyWord, message, res, callback) {
        console.log(util.format(GOOGLE_API, KEY_ID, keyWord));
        https.get(util.format(GOOGLE_API, KEY_ID, keyWord), (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                callback(message, util.format(BASE_YOUTUBE_URL, JSON.parse(data).items[0].id.videoId), res);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

}

module.exports = Youtube;

