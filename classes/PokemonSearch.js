var scrapy = require('node-scrapy')
var baseUrl = "https://www.pokemon.com/us/pokedex/";
var selector = ".version-descriptions .version-y";
class PokemonSearch {
   constructor() {
   }
   
	search(pokemon) {
		var result = "";
		scrapy.scrape('https://www.pokemon.com/us/pokedex/' + pokemon, selector, function(err, data) {
			result = err !== undefined ? err : data;
		});	
		console.log("data " + result)
		return result;
	}
}
module.exports = PokemonSearch;