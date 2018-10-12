class NickNameValidation {
    constructor() {
    }

    saySomegthing(message) {
        if(message.from.username == 'DiegoLAA90')
            return "Chupelo";
        else if (message.from.username.toLowerCase().includes('Alejoqm'.toLowerCase()))
            return "@" + message.from.username + " deje de enseñarme pendejadas y  literalmente maricadas!";
        else
            return "";
    }

}
module.exports = NickNameValidation;