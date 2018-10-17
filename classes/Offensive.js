var forEach = require("for-each")
var offensiveWords = ["gay", "chupelo", "bobo", "tonto", "sapo"];
var accents = require('remove-accents');

class Offensive {

    constructor() {
    }

    hasOffensiveContent(text) {
        var response = false;
        text = accents.remove(text);
        forEach(offensiveWords, function (value, key, array) {
            console.log(text + " " + value)
            if (text.toLowerCase().search(value.toLowerCase()) !== -1) {
                console.log("Contains")
                response = true;
            }
        })
        return response;
    }
}
module.exports = Offensive;