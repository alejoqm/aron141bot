var ignoreCase = require('ignore-case');
var scrapy = require('node-scrapy')
var baseUrl = "https://www.pokemon.com/us/pokedex/";
var selector = ".version-descriptions .version-y";
var selectorWeakness = ".active .dtm-weaknesses ul li a";
var errorMsg = "Rili!! pokemon este, te buscare y te mordere";

var Publisher = require('./Publisher.js');
publisher = new Publisher();

class PokemonSearch {
   constructor() {
   }

   isACommand(command) {
       var commands = ["pokemon", "weakness"];
       return commands.includes(command.toLowerCase());
   }

   async perform(command, pokemon, message, res) {
		if(ignoreCase.equals(command, "pokemon")) {
			await this.search(pokemon, message, res);
		} else {
			await this.weakness(pokemon, message, res);
		}
   }

	async search(pokemon, message, res) {
		var result = "";
		try {
			scrapy.scrape('https://www.pokemon.com/us/pokedex/' + pokemon, selector, async function(err, data) {
				console.log(err + " " + data)
				if(err !== null) {
					await publisher.publish(message, errorMsg);
				} else {
				   result = Array.isArray(data) ? data[0] : data;
				   console.log("data " + result)
					await publisher.publish(message, result);
				}	
			});
		}
		catch(err) {
			console.log(err);
			await publisher.publish(message, '');
		}	
	}

	async weakness(pokemon, callback, message, res) {
        var result = "";
        scrapy.scrape('https://www.pokemon.com/us/pokedex/' + pokemon, selectorWeakness, async function(err, data) {
            console.log(err + " " + data)
            if(err !== null) {
				await publisher.publish(message, errorMsg);
            } else {
                result = Array.isArray(data) ? data.join() : data;
                console.log("data " + result)
				await publisher.publish(message, result);
            }
        });



	}
}
module.exports = PokemonSearch;
