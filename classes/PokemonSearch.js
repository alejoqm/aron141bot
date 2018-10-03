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
				result = err !== null ? err : data;
				result = Array.isArray(result) ? result[0] : result;
				console.log("data " + result)
				callback(message, result, res);
			});
		}
		catch(err) {
			console.log(err)
			result = "";
		}	
	}
}
module.exports = PokemonSearch;
