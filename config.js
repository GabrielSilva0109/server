require('dotenv').config();
const mysql = require('mysql2');

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}/${process.env.MYSQLDATABASE}`;
const connection = mysql.createConnection(urlDB);

module.exports = connection;
