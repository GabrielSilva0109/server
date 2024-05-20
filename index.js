const express = require("express")
const app = express()
require('dotenv').config()

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