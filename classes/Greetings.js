class Greetings {
    constructor() {
    }

    
    sayHello(message) {
        return "Hola @" + message.from.username + " Ahora estoy en AWS.";
    }

}
module.exports = Greetings;