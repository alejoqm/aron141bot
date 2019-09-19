const axios = require('axios')
const util = require('util');
const Publisher = require('./Publisher.js')
const publisher = new Publisher();

const GET_FILE_URL = 'https://api.telegram.org/file/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/';
const AWS = require('aws-sdk');

const testMessage = {'chat': {'id': 505838126}, 'from' : {'username': 'Alejoqm'}, 'date': 123126};

const KEY_ID = process.env.key_id;
const ACCESS_KEY = process.env.access_key;
const BUCKET = 'aronbottelegram';
const TOKEN = '519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak'
const GET_PHOTO = 'https://api.telegram.org/bot%s/getFile?file_id=%s'

class File {

    constructor() {
    }

    async getFile(message, fileId) {
        this.getFilePath(fileId).then(res => {
            this.downloadFile(message, res);
        })
    }

    async downloadFile(message, filePath) {
        var imageStream;
        await axios.get(GET_FILE_URL + filePath,  {
            responseType: 'arraybuffer'
        })
            .then(response => imageStream = Buffer.from(response.data, 'base64'));
        console.log(GET_FILE_URL + filePath)
        await this.uploadFile(message, imageStream)
    }

    async getFilePath(fileId) {
        var res;
        await axios.get(
            util.format(GET_PHOTO, TOKEN, fileId),
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

    async uploadFile(message, imageStream) {
        const imageRemoteName = message.from.username + '_' + message.date + '.jpg';
        console.log('Uploading Image');

        AWS.config.update({
            accessKeyId: KEY_ID,
            secretAccessKey: ACCESS_KEY
        });

        const s3 = new AWS.S3();

        let params = {
            'Bucket': BUCKET,
            'Key': imageRemoteName,
            'Body': imageStream,
        }

        var url = '';
        await s3.putObject(params, function(response) {
            console.log(response);
            url = s3.getSignedUrl('getObject', {Bucket: BUCKET, Key: imageRemoteName});
        });
        console.log(url);
        await publisher.publish(message, url);
    }
}
module.exports = File;