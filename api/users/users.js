const Express = require('express')
const Profile = require('./profile/profile')

const Router = Express.Router()

Router.get('/profile', Profile)

module.exports = Router;