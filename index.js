const express = require("express")

// Middlewares
const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use("/api")

app.get('/', (req, res) => {
    res.send("bem vindo")
})

// connection
const port = process.env.PORT || 9001

app.listen(port, () => console.log(`Listening to port ${port}`))