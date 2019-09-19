const ignoreCase = require('ignore-case');
const Database = require('./classes/Database.js');
const File = require('./classes/File.js');
const file = new File();
const database = new Database();

//Handle the GET endpoint on the root route /
module.exports.server = async (event) => {

    var message = '';
    if(event.body) {
        console.log("New req with body: " + event.body);
        message = JSON.parse(event.body).message;
    } else {
        console.log("New req " + event);
        message = JSON.parse(JSON.stringify(event)).message;
    }

    console.log('Message ' + message);

    //Validate time of message
    var unix = Math.round(+new Date()/1000);
    if( message === null || message === undefined || message.date === undefined || unix - message.date > 5000 ) {
        console.log("Message too old or undefined.")
        return message ? {"statusCode": 200, "body": "message " + message.date} : {"statusCode": 400, "body": "message is undefined"};
    } else {
        await database.insertMessage(message);
        if (message.photo !== undefined) {
            console.log(message.photo);
            await file.getFile(message, message.photo[0].file_id);
            //publish(message, "Que linda foto!", res)
            return {"statusCode": 200};
        }
        else {
            return {"statusCode": 200};
        }
    }
}

