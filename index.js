const express = require("express")
const app = express()
require('dotenv').config()

app.use(express.json())

// Routes
app.use("/api", User)

app.get("/", async (req, res, next) => {
    res.send('Bem vindo ao Servidor')
})

// connection
const port = process.env.PORT || 9001
app.listen(port, () => console.log(`Listening to port ${port}`))