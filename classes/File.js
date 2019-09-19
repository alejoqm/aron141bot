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

AWS.config.update({
    accessKeyId: KEY_ID,
    secretAccessKey: ACCESS_KEY
});

const s3 = new AWS.S3();

class File {

    constructor() {
    }

    async getFile(message, fileId) {
        var filePath = '';
        await this.getFilePath(fileId).then(res => {
           filePath = res;
        });

        var imageStream = '';

        await this.downloadFile(message, filePath).then(_imageStream => {
            imageStream = _imageStream
        });

        var imageRemoteName = '';
        await this.uploadFile(message, imageStream).then(_url => {
            imageRemoteName = _url;
        });

        console.log('Remote name: ' + imageRemoteName);

        var url = '';
        await this.getInfoUpload(imageRemoteName).then(awsUrl => url = awsUrl);

        console.log('Ready to publish  ' + url);

        await publisher.publish(message, "Your image was saved " + url);

    }

    async downloadFile(message, filePath) {
        console.log('downloading file ' + GET_FILE_URL + filePath);
        return new Promise(function (resolve, reject) {
            axios.get(GET_FILE_URL + filePath,  {
                responseType: 'arraybuffer'
            })
                .then(response => resolve(Buffer.from(response.data, 'base64')));
        });
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
            });
        console.log("File path " + res)
        return res;
    }

    async uploadFile(message, imageStream) {
        console.log('Uploading to S3.')
        return new Promise(function (resolve, reject) {
            const imageRemoteName = message.from.username + '_' + message.date + '.jpg';
            console.log('Uploading Image');

            let params = {
                'Bucket': BUCKET,
                'Key': imageRemoteName,
                'Body': imageStream,
            }

            s3.putObject(params, function(response) {
                console.log('Upload OK.');
            });
            resolve(imageRemoteName);
        });
     }

     async getInfoUpload(imageRemoteName) {
        return new Promise(function (resolve, reject) {
            resolve(s3.getSignedUrl('getObject', {Bucket: BUCKET, Key: imageRemoteName}));
        })
     }
}
module.exports = File;