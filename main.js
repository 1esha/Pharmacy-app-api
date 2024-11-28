const express = require("express");
const mysql = require("mysql2");

const app = express();  
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "user",
  database: "pharmacy_app_db",
  password: "maw)874=trFz21"
}).promise();


app.listen(4000);