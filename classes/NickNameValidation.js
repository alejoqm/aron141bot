class NickNameValidation {
    constructor() {
    }


    automaticResponse(message) {
        if(message.from.username == undefined) {
            return "";
        }

        if(message.from.username == 'DiegoLAA90')
            return "Biker la plata del community day";

    }

    saySomegthing(message) {
        if(message.from.username == undefined) {
            return "";
        }

        if(message.from.username == 'DiegoLAA90')
            return "Chupelo";
        else if (message.from.username.toLowerCase().includes('Alejoqm'.toLowerCase()))
            return "@" + message.from.username + " deje de enseñarme pendejadas y  literalmente maricadas!";
        else if (message.from.username == 'polita193_31')
            return "@" + message.from.username + " Dame una galleta!";
        else
            return "";
    }

}
module.exports = NickNameValidation;