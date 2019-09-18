var KEY_ID = 'AIzaSyC6CZXer_2wDORWvdhKQIildDG7xNoU5ec';
const https = require('https');
const GOOGLE_API = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=%s&q=%s';
var util = require('util');
const BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"

var Publisher = require('./Publisher.js');
publisher = new Publisher();


class Youtube {
    constructor() {
    }

    async search(message, keyWord) {

        let request_call = new Promise((resolve, reject) => {
            https.get(util.format(GOOGLE_API, KEY_ID, keyWord), async (resp) => {
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    if(JSON.parse(data).items !== undefined && JSON.parse(data).items[0].id !== undefined && JSON.parse(data).items[0].id.videoId !== undefined) {
                        resolve(util.format(BASE_YOUTUBE_URL, JSON.parse(data).items[0].id.videoId));
                    } else {
                        resolve('');
                    }
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err.message);
            });
        });

        request_call.then(async (response) => {
            console.log(response);
            await publisher.publish(message, response);
        }).catch((error) => {
            console.log(error);
        });
    }
}

module.exports = Youtube;

