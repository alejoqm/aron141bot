var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
var ignoreCase = require('ignore-case');
var validator = require('validator');
var forEach = require("for-each")

var jsonWords = {
	"aron": {
		"equal": "Destruyendo y Comiendo",
		"contains": "Te buscare y te mordere"
	},
	"maris": {
		"equal": "Esta Durmiendo | Dejando un pidgey en un gimanio",
		"contains": "OIEEEEEEEEEEEEEEEE"
	},
	"biker": {
		"equal": "Buscando un tyranitar | Dejando un dito en un gimansio",
		"contains": "no llega, vive en la calera."
	},
	"Pao": {
		"equal": "Soy nivel 31",
		"contains": "Ya va con su Charizard."
	},
	"Paisa": {
		"equal": "Se fue con su pajaro de tres cabezas.",
		"contains": "Jugando FIFA."
	},
	"Tyranitar": {
		"equal": "Lo llaman el demoledor",
		"contains": "Dejame buscar uno."
	}
};


app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body
  console.log("New request " + message.responsemessage)
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  var responsemessage = getResponseMessage();
  console.log("The response message is " + responsemessage)
  if(validator.isEmpty(responsemessage)) {
    return res.end()
  }
  
  axios.post(
      'https://api.telegram.org/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/sendMessage',
      {
        chat_id: message.chat.id,
        text: responsemessage
      }
    )
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })  
  }
)

// Finally, start our server
app.listen(process.env.PORT, function() {
  console.log('Telegram app listening on port !' + process.env.PORT)
})

function getResponseMessage(word) {
	var response = "";
	forEach(jsonWords, function (value, key, array) {
		if(ignoreCase.equals(key, word)) {
			response = value.equal;
		}
	})
	return response;
}