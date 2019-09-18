var bodyParser = require('body-parser')
var ignoreCase = require('ignore-case');
var validator = require('validator');

var Command = require('./classes/Command.js')
var Offensive = require('./classes/Offensive');
var Gratitude = require('./classes/Gratitude');
var SubjectName = require('./classes/SubjectName');
var Database = require('./classes/Database.js');

var command = new Command();
var offensive = new Offensive();
var gratitude = new Gratitude();
var subjectName = new SubjectName();
var database = new Database();

var Publisher = require('./classes/Publisher.js')
var Youtube = require('./classes/Youtube.js');

//var youtube = new Youtube();
//const testMessage = {'chat': {'id': 505838126}};
//command.resolve(testMessage, 'youtube pikachu')
//youtube.search(testMessage, 'Unova');

/*const message = {text: 'MySQL Synchronous', from: {username: 'alejoqm', first_name: 'Luis', last_name: 'Quintero'}, chat: {type: 'single', title: 'aronBoot', date: 1568386656}};
database.insertMessage(message)

publisher = new Publisher();
await publisher.publish(testMessage, "Testing message");
command.resolve(testMessage, 'Pokemon pikachu')*/


//Handle the GET endpoint on the root route /
module.exports.server = async (event) => {


    /*const testMessage = {'chat': {'id': 505838126}};
    publisher = new Publisher();
    await publisher.publish(testMessage, "Testing message");
    command.resolve(testMessage, 'Pokemon pikachu')*/

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
        if(message.forward_from !== undefined || message.forward_from_chat !== undefined) {
            console.log('This message was forwarded');
            await publisher.publish(message, 'Seriusly ' + message.from.username + ', generando spam!!');
        } else if (message.photo !== undefined) {
            console.log(message.photo);
            //publish(message, "Que linda foto!", res)
            return {"statusCode": 200};
        }
        else if (message.text == undefined) {
            return {"statusCode": 200};
        } else {
            var subjectNameValue = subjectName.getSubjectName(message.text);
            var offensiveValue = offensive.hasOffensiveContent(message.text);
            var gratitudeValue = gratitude.hasGratitudeContent(message.text);
            console.log('New message ' + message.text + ' Subject ' + subjectNameValue + " " + offensiveValue)

            if (ignoreCase.equals("aron", subjectNameValue)) {
                if (offensiveValue) {
                    await publisher.publish(message, "are you talking to me? https://www.youtube.com/watch?v=LpJOxbaC8YU");
                } else if (gratitudeValue) {
                    await publisher.publish(message, "Gracias a ti");
                } else {
                    command.resolve(message, message.text);
                }
            } else {
                command.resolve(message, message.text);
            }
        }
        return {"statusCode": 200};
    }
}

