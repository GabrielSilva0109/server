const express = require("express")
const pool = require('./db')
const User = require("./routes/UserRoutes")

const app = express()
app.use(express.json())

// Routes
app.use("/api", User)

app.get("/", async (req, res, next) => {
    res.send('Bem vindo ao Servidor')
})

// connection
const port = process.env.PORT || 9001
app.listen(port, () => console.log(`Listening to port ${port}`))