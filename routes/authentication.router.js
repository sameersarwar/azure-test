const express = require('express')
const authRouter = express.Router()

const { register, validateUsername, login } = require('../middlewares/authentication')

authRouter.post('/register', register)
authRouter.post('/validateUsername', validateUsername)
authRouter.post('/login', login)

module.exports = authRouter
