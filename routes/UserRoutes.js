const express = require("express")
const userController = require("../controller/UserController")

const router = express.Router()

router.get("/user", async (req, res) => {
    res.send('Usuarios')
})

router.get("/users", userController.getUsers)

module.exports = router