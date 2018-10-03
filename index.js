var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var ignoreCase = require('ignore-case');
var validator = require('validator');
var Publisher = require("./classes/Publisher.js")
var Command = require("./classes/Command.js")
var command = new Command();

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body
  console.log("New request " + message.text)
  command.resolve(message, message.text, publish, res);
})


// Finally, start our server
app.listen((process.env.PORT || 3000), function() {
  console.log('Telegram app listening on port !' + (process.env.PORT || 3000))
})

function publish(message, responsemessage, res) {
	console.log("The response message is " + responsemessage)
   if(responseMessage !== undefined) {  
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