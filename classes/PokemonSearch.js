var scrapy = require('node-scrapy')
var baseUrl = "https://www.pokemon.com/us/pokedex/";
var selector = ".version-descriptions .version-y";
var errorMsg = "Really!! ese pokemon no existe, te buscare y te mordere";
class PokemonSearch {
   constructor() {
   }
   
	search(pokemon, callback, message, res) {
		console.log(pokemon)
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
}
module.exports = PokemonSearch;
