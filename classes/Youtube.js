var KEY_ID = 'AIzaSyC6CZXer_2wDORWvdhKQIildDG7xNoU5ec';
const https = require('https');
const GOOGLE_API = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=%s&q=%s';
var util = require('util');
const BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"
 
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
                if(JSON.parse(data).items !== undefined && JSON.parse(data).items.lenght > 0 && JSON.parse(data).items[0].id !== undefined && JSON.parse(data).items[0].id.videoId !== undefined) {
                    callback(message, util.format(BASE_YOUTUBE_URL, JSON.parse(data).items[0].id.videoId), res);
                } else {
                    callback(message, '', res);
                }
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

}

module.exports = Youtube;

