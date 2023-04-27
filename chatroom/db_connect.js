var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: "localhost",
    user: "senih",
    password: process.env.DB_PASSWORD,
    database: "chatroom"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "INSERT INTO accounts (username, password) VALUES ('halil', 'Anne123')";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("user halil added to table");
    //     process.exit(0);
    // });
})
function createUser(username, email, password, callback) {
    const query = 'INSERT INTO accounts (username, email, password) VALUES (?,?,?)';
    con.query(query, [username, email, password], callback);

}

module.exports = {
    con: con,
    createUser: createUser,
};

