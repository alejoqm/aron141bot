const axios = require('axios')

const GET_FILE_URL = 'https://api.telegram.org/file/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/';
const AWS = require('aws-sdk');

const testMessage = {'chat': {'id': 505838126}, 'from' : {'username': 'Alejoq'}, 'date': 123123};

const KEY_ID = process.env.key_id;
const ACCESS_KEY = process.env.access_key;

class File {

    constructor() {
    }

    async getFile() {
        this.getFilePath().then(res => {
            this.downloadFile(res);
        })
    }

    async downloadFile(filePath) {
        var imageStream;
        await axios.get(GET_FILE_URL + filePath)
            .then(response => imageStream = response.data);
        this.uploadFile(testMessage, imageStream, filePath)
        return imageStream;
    }

    async getFilePath() {
        var res;
        await axios.get(
            'https://api.telegram.org/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/getFile?file_id=AgADAQADX6gxG2PAGURAmPeJStst8AQAAQswAAQBAAMCAANtAAMkdgUAARYE',
        )
            .then(response => {
                if(response.data && response.data.result)
                    res = response.data.result.file_path;
            })
            .catch(err => {
                throw err;
            })
        return res;
    }

    async uploadFile(message, imageStream, fileName) {
        console.log('Uploading Image');

        AWS.config.update({
            accessKeyId: KEY_ID,
            secretAccessKey: ACCESS_KEY
        });

        const s3 = new AWS.S3();

        let params = {
            'Bucket': 'aronbottelegram',
            'Key': fileName,
            'Body': imageStream,
        }

        s3.putObject(params, function(err, data) {
            console.log(err);
        })
    }
}
module.exports = File;