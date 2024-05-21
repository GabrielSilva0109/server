const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')

router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUserById)
router.post('/user', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router