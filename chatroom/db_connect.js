var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "senih",
    password: "Senih123",
    database: "chatroom"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO accounts (username, password) VALUES ('halil', 'Anne123')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("user halil added to table");
        process.exit(0);
    });
})

