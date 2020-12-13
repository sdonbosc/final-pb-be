const mysql = require("mysql");

//create database connection
const conn = mysql.createConnection({
    host: "sql2.freemysqlhosting.net", 
    user: "sql2380453", 
    password: "Cedrick9(", 
    database: "sql2380453"
    //multipleStatements: true
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log("Connected...");
});

setInterval(function() {
    conn.query("SELECT 1");
}, 5000);
module.exports = conn;