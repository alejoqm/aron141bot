class NickNameValidation {
    constructor() {
    }

    saySomegthing(message) {
        if(message.from.username == 'DiegoLAA90')
            return "Chupelo";
        else
            return "";
    }

}
module.exports = NickNameValidation;