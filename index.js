const express = require("express")
const app = express()
require('dotenv').config();
const mysql = require("mysql2/promise");

// Conexão com o banco de dados
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}/${process.env.MYSQLDATABASE}`
let connection

mysql.createConnection(urlDB)
  .then(conn => {
    connection = conn;
    console.log("Connected to the database");
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  })
  
app.use(express.json())



app.get("/", async (req, res, next) => {
    res.send('Bem vindo ao Servidor')
})

// Rota para buscar todos os dados da tabela users
app.get("/users", async (req, res, next) => {
    try {
      const [rows] = await connection.execute("SELECT * FROM users");
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });


// connection
const port = process.env.PORT || 9001
app.listen(port, () => console.log(`Listening to port ${port}`))