
class Database {
    constructor() {
    }

    async insertMessage(message) {
        console.log("Saving in database")
        var MySql = require('sync-mysql');
        var util = require('util')
        var con = new MySql({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });
        let sqlStatement = util.format("INSERT INTO messages SET id = %d, username = '%s', message = '%s', isGroup = '%s', name = '%s', chat = '%s', date = %d",
            message.chat.id, message.from.username, message.text, message.chat.type == 'group', message.from.first_name + ' ' + message.from.last_name, message.chat.title ? message.chat.title : message.chat.type, message.date ? message.date : 0);
        console.log(sqlStatement);
        con.query(sqlStatement);
        con._end();
    }

}
module.exports = Database;
