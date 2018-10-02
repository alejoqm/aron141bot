var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
var ignoreCase = require('ignore-case');
var validator = require('validator');
var forEach = require("for-each")

var jsonWords = {
	"aron": {
		"equal": "Destruyendo y Comiendo | Estrenando camita | Buscando a mi mama",
		"contains": "Te buscare y te mordere"
	},
	"maris": {
		"equal": "Esta Durmiendo | Dejando un pidgey en un gimanio | Dime chiquita",
		"contains": "OIEEEEEEEEEEEEEEEE"
	},
	"biker": {
		"equal": "Buscando un tyranitar | Dejando un dito en un gimansio",
		"contains": "no llega, vive en la calera."
	},
	"pao": {
		"equal": "Soy nivel 31 | Ya va con su Charizard",
		"contains": "Ya va con su Charizard."
	},
	"paisa": {
		"equal": "Se fue con su pajaro de tres cabezas. | ",
		"contains": "Jugando FIFA."
	},
	"tyranitar": {
		"equal": "Lo llaman el demoledor",
		"contains": "Dejame buscar uno."
	}, 
	"hola": {
		"equal": "Que dice la maquina | whatsuppppp | que se cuenta | Oh no you again"
	},
	"buenas Noches": {
		"equal": "Descansa Fiera | Que tal el dia | "
	},
	"buenos Dias": {
		equal: "Buen dia de casa | a por el tyranitar | otro dia de mewtwo"
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
  console.log("New request " + message.text)
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  var responsemessage = getResponseMessage(message.text);
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
app.listen((process.env.PORT || 3000), function() {
  console.log('Telegram app listening on port !' + (process.env.PORT || 3000))
})

function getResponseMessage(word) {
	var response = "";
	forEach(jsonWords, function (value, key, array) {
		if(ignoreCase.equals(key, word)) {
			var str = value.equal;
			console.log(str + " " + str.indexOf("|"))
			if(str.indexOf("|") !== -1) {
				var res = str.split("|"); 
				console.log(res.length)
				var random = getRandomInt(res.length - 1);
				response = res[random];
			} else {
				response = str;	
			}
		}
	});
	
	return response;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}