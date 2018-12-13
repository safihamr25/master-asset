var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "asset_registry"
});

con.connect(function (err) {
    if (err) console.log("Error on connecting database");
    console.log("Connected to Database successfully!");
});

module.exports = con;