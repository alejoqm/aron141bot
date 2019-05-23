var validator = require('validator');
var ignoreCase = require('ignore-case');
var forEach = require("for-each")
var PokemonSearch = require("./PokemonSearch.js")
var pokemon = new PokemonSearch();
var accents = require('remove-accents');
var Greetings = require("./Greetings.js")
var greetings = new Greetings();
var NickNameValidation = require('./NickNameValidation.js');
var nickNameValidation = new NickNameValidation();
var Youtube = require("./Youtube.js")
var youtube = new Youtube();

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
		"equal": "Buscando un tyranitar | Dejando un dito en un gimnasio | No llega, vive en la calera.",
		"contains": "no llega, vive en la calera."
	},
	"pao": {
		"equal": "Soy nivel 31 | Ya va con su Charizard",
		"contains": "Ya va con su Charizard."
	},
	"paisa": {
		"equal": "Se fue con su pajaro de tres cabezas. | Esta Jugando Fifa",
		"contains": "Jugando FIFA."
	},
	"tyranitar": {
		"equal": "Lo llaman el demoledor | Gracias biker por dejarnos morir",
		"contains": "Dejame buscar uno."
	}, 
	"hola": {
		"equal": "Oliiiii | Que dice la maquina | whatsuppppp | que se cuenta | Oh no you again"
	},
	"buenas noches": {
		"equal": "Descansa Fiera | Que tal el dia | "
	},
	"buenos dias": {
		"equal": "Buen dia de caza | a por el tyranitar | otro dia de mewtwo"
	},
	"1,2": {
		"equal": "Ultraviolento"
	},
	"saben": {
		"equal": "Este"
	},
	"cual":{
		"contains": "este."
	},
	"donde":{
		"contains": "donde no le llega el sol"
	}
	
};

class Command {
   constructor() {
   }
   
   resolve(message, textMessage, callback, res) {
	textMessage = accents.remove(textMessage);


	if(textMessage !== undefined) {
	   var command = textMessage.split(" ");
	   if(Array.isArray(command)) {   
	   	if(pokemon.isACommand(command[0])) {
		   pokemon.perform(command[0], command[1], callback, message, res);
	   	} else if(ignoreCase.equals(command[0], "hola")) {
	   		callback(message, greetings.sayHello(message), res)
		} else if(ignoreCase.equals(command[0], "youtube")) {
			youtube.search(new Regex('youtube', 'i').Replace(textMessage, ''), message, res, callback);
	 	} 
		else {
		   callback(message, this.getResponseMessage(message, textMessage), res);
	   	}
	   } else {
	  	   callback(message, "", res);
	   }
        } else {
        	  callback(message, "", res);
	}
   }


	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}
   
	getResponseMessage(message, word) {
		var response = "";
		var that = this;
		forEach(jsonWords, function (value, key, array) {
			if(ignoreCase.equals(key, word)) {
				var str = value.equal;
				if(str != undefined &&  str.indexOf("|") !== -1) {
					var res = str.split("|"); 
					var random = that.getRandomInt(res.length - 1);
					response = res[random];
				} else {
					response = str;	
				}
			} else if (word.toLowerCase().search(key.toLowerCase()) !== -1){
				var str = value.contains;
				if(str != undefined && str.indexOf("|") !== -1) {
					var res = str.split("|"); 
					var random = that.getRandomInt(res.length - 1);
					response = res[random];
				} else {
					response = str;	
				}
			}
		});

		if(validator.isEmpty(response)) {
            return nickNameValidation.saySomegthing(message);
		}

		return response;
	}
}
module.exports = Command;
