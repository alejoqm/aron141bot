var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var ignoreCase = require('ignore-case');
var validator = require('validator');
var Publisher = require("./classes/Publisher.js")
var Command = require("./classes/Command.js")
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
app.post('/new-message', function(req, res) {
  const { message } = req.body
    if(message.photo !== undefined) {
        console.log(message.photo);
        publish(message, "Que linda foto!", res)
    }
    else if(message.text == undefined) {
      res.end();
    } else {
      var subjectNameValue = subjectName.getSubjectName(message.text);
      var offensiveValue = offensive.hasOffensiveContent(message.text);
      var gratitudeValue = gratitude.hasGratitudeContent(message.text);
      console.log('New message ' + message.text + ' Subject ' + subjectNameValue + " " + offensiveValue)

      if(ignoreCase.equals("aron", subjectNameValue)) {
          if(offensiveValue)
            publish(message, "are you talking to me? https://www.youtube.com/watch?v=LpJOxbaC8YU", res);
          else if(gratitudeValue)
              publish(message, "Gracias a ti", res);
      } else {
          command.resolve(message, message.text, publish, res);
      }
  }



})


// Finally, start our server
app.listen((process.env.PORT || 3000), function() {
  console.log('Telegram app listening on port !' + (process.env.PORT || 3000))
    var text = "aron gay"
})

function publish(message, responsemessage, res) {
	console.log("The response message is " + responsemessage)
   if(responsemessage !== undefined) {  
   	if(validator.isEmpty(responsemessage)) {
    		return res.end()
   	} else {
		var publisher = new Publisher();
	  	publisher.publish(message, responsemessage, res);
   	}
    } else {
       return res.end();
    }
}