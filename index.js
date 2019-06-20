var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var ignoreCase = require('ignore-case');
var validator = require('validator');
var Publisher = require("./classes/Publisher.js")
var Command = require("./classes/Command.js")
var Database = require("./classes/Database.js")

var command = new Command();


var Offensive = require("./classes/Offensive.js")
var offensive = new Offensive();

var Gratitude = require("./classes/Gratitude.js")
var gratitude = new Gratitude();

var SubjectName = require("./classes/SubjectName.js")
var subjectName = new SubjectName();

app.use(bodyParser.json()) // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function (req, res) {
    console.log("New req " + req);
    const {message} = req.body
    console.log('Message ' + message);
    //Validate time of message
    var unix = Math.round(+new Date()/1000);
    if( message === null || message === undefined || message.date === undefined || unix - message.date > 5000 ) {
        console.log("Message too old or undefined.")
        res.end();
    } else {
        console.log(message.forward_from !== undefined + ' ' +  message.forward_from_chat !== undefined);
        if(message.forward_from !== undefined || message.forward_from_chat !== undefined) {
            console.log('This message was forwarded');
            publish(message, 'Seriusly ' + message.from.username + ', generando spam!!', res);
        } else if (message.photo !== undefined) {
            console.log(message.photo);
            //publish(message, "Que linda foto!", res)
            res.end();
        }
        else if (message.text == undefined) {
            res.end();
        } else {
            var subjectNameValue = subjectName.getSubjectName(message.text);
            var offensiveValue = offensive.hasOffensiveContent(message.text);
            var gratitudeValue = gratitude.hasGratitudeContent(message.text);
            console.log('New message ' + message.text + ' Subject ' + subjectNameValue + " " + offensiveValue)

            if (ignoreCase.equals("aron", subjectNameValue)) {
                if (offensiveValue) {
                    publish(message, "are you talking to me? https://www.youtube.com/watch?v=LpJOxbaC8YU", res);
                } else if (gratitudeValue) {
                    publish(message, "Gracias a ti", res);
                } else {
                    command.resolve(message, message.text, publish, res);
                }
            } else {
                command.resolve(message, message.text, publish, res);
            }
        }
    }
})


// Finally, start our server
app.listen((process.env.PORT || 3000), function () {
    Database.insertMessage("DiegoR", "Diego Test");
    console.log('Telegram app listening on port !' + (process.env.PORT || 3000))
})

function youtubeR(url) {
    console.log(url);
}

function publish(message, responsemessage, res) {
    console.log("The response message is " + responsemessage)
    if (responsemessage !== undefined) {
        if (validator.isEmpty(responsemessage)) {
            return res.end()
        } else {
            var publisher = new Publisher();
            publisher.publish(message, responsemessage, res);
        }
    } else {
        return res.end();
    }
}