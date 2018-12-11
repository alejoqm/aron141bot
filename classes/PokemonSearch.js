var ignoreCase = require('ignore-case');
var scrapy = require('node-scrapy')
var baseUrl = "https://www.pokemon.com/us/pokedex/";
var selector = ".version-descriptions .version-y";
var selectorWeakness = ".active .dtm-weaknesses ul li a";
var errorMsg = "Rili!! pokemon este, te buscare y te mordere";
class PokemonSearch {
   constructor() {
   }

   isACommand(command) {
       var commands = ["pokemon", "weakness"];
       return commands.includes(command.toLowerCase());
   }

   perform(command, pokemon, callback, message, res) {
		if(ignoreCase.equals(command, "pokemon")) {
			this.search(pokemon, callback, message, res);
		} else {
			this.weakness(pokemon, callback, message, res);
		}
   }

	search(pokemon, callback, message, res) {
		var result = "";
		try {
			scrapy.scrape('https://www.pokemon.com/us/pokedex/' + pokemon, selector, function(err, data) {
				console.log(err + " " + data)
				if(err !== null) {
				   callback(message, errorMsg, res);
				} else {
				   result = Array.isArray(data) ? data[0] : data;
				   console.log("data " + result)
				   callback(message, result, res);
				}	
			});
		}
		catch(err) {
			console.log(err)
			callback(message, errorMsg, res);
		}	
	}

	weakness(pokemon, callback, message, res) {
        var result = "";
        scrapy.scrape('https://www.pokemon.com/us/pokedex/' + pokemon, selectorWeakness, function(err, data) {
            console.log(err + " " + data)
            if(err !== null) {
                callback(message, errorMsg, res);
            } else {
                result = Array.isArray(data) ? data.join() : data;
                console.log("data " + result)
                callback(message, result, res);
            }
        });



	}
}
module.exports = PokemonSearch;
