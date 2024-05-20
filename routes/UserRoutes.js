const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')

router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUserById)
router.post('/user', userController.createUser)

module.exports = router