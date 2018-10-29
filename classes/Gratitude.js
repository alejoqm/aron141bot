var forEach = require("for-each")
var offensiveWords = ["gracias"];
var accents = require('remove-accents');

class Gratitude {

    constructor() {
    }

    hasGratitudeContent(text) {
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
module.exports = Gratitude;