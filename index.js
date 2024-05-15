const express = require("express")
const home = require("./routes/home")
const User = require("./routes/UserRoutes")

const app = express()
app.use(express.json())

// Routes
app.use("/home", home, User)

// connection
const port = process.env.PORT || 9001
app.listen(port, () => console.log(`Listening to port ${port}`))