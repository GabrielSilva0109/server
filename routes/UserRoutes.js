const express = require("express")
const router = express.Router()

router.get("/User", async (req, res, next) => {
    res.send('Bem vindo ao Servidor')
})

module.exports = router