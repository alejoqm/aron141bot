var forEach = require("for-each")
var commonName = ["aron", "diego", "biker", "maris", "paisa", "alejo"];
var accents = require('remove-accents');

class SubjectName {

    constructor() {
    }

    getSubjectName(text) {
        var nameFound = "";
        text = accents.remove(text);
        forEach(commonName, function (value, key, array) {
            if (text.toLowerCase().search(value.toLowerCase()) !== -1) {
                console.log("Contains")
                nameFound = value;
            }
        })
        return nameFound;
    }
}
module.exports = SubjectName;