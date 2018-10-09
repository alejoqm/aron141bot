class Greetings {
    constructor() {
    }

    sayHello(message) {
        return "Hola @" + message.from.username;
    }

}
module.exports = Greetings;