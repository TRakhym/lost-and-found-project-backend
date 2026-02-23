const Express = require('express')
const Register = require('./register/register')

const Router = Express.Router()

Router.post('/register', Register)

module.exports = Router;