const express = require("express")
const router = express.Router()

router.get("/user", async (req, res, next) => {
    res.send('Usuarios')
})

module.exports = router