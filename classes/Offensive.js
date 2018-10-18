var forEach = require("for-each")
var offensiveWords = ["gay", "chupelo", "bobo", "tonto", "sapo", "fucker", "silly", "bitch", "puto", "puta", "hueva", "pendejo", "mosesual", "homosexual", "capado"];
var accents = require('remove-accents');

class Offensive {

    constructor() {
    }

    hasOffensiveContent(text) {
        var response = false;
        text = accents.remove(text);
        forEach(offensiveWords, function (value, key, array) {
            if (text.toLowerCase().search(value.toLowerCase()) !== -1) {
                response = true;
            }
        })
        return response;
    }
}
module.exports = Offensive;