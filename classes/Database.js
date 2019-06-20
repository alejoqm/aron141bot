const Pool = require('pg').Pool
var pool;

class Database {
    static getPool() {
        if(!pool) {
            pool = new Pool({
                user: 'jdufhzaubvvoss',
                host: 'ec2-54-83-33-14.compute-1.amazonaws.com',
                database: 'dhisd27gch2l5',
                password: 'd41773bcc998906e240ad44689711598c21ec9288243e53fc871bf7bd2105515',
                port: 5432,
              });
        }
        return pool;
    }

    static insertMessage(username, message) {
        var INSERT = "insert into public.message VALUES(unique_rowid(), '" + username + "', '" + message + "', " + new Date() + ");";
        console.log(INSERT);
        Database.getPool().query(INSERT, (error, results) => {
            if (error) {
                console.log(error);
            }
            console.log(results)
        });
    }
}
module.exports = Database;
