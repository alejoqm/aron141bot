var forEach = require("for-each")
var offensiveWords = ["gay", "chupelo", "bobo", "tonto", "sapo"];

class Offensive {

    constructor() {
    }

    hasOffensiveContent(text) {
        var response = false;
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