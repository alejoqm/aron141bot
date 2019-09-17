var KEY_ID = 'AIzaSyC6CZXer_2wDORWvdhKQIildDG7xNoU5ec';
const https = require('https');
const GOOGLE_API = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=%s&q=%s';
var util = require('util');
const BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"
 
class Youtube {
    constructor() {
    }

    async search(keyWord) {
        console.log(util.format(GOOGLE_API, KEY_ID, keyWord));
        https.get(util.format(GOOGLE_API, KEY_ID, keyWord), (resp) => {
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    if(JSON.parse(data).items !== undefined && JSON.parse(data).items[0].id !== undefined && JSON.parse(data).items[0].id.videoId !== undefined) {
                        console.log(JSON.parse(data).items[0].id.videoId)
                        return JSON.parse(data).items[0].id.videoId;
                    } else {
                        return '';
                    }
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
                return '';
        });
    }
}

module.exports = Youtube;

