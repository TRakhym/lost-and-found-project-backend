const Express = require('express')
const Profile = require('./profile/profile')
const Update = require('./update/update')

const upload = require('../functions/upload')

const Router = Express.Router()

Router.get('/profile', Profile)
Router.put('/update', upload.single('profilePic'), Update)

module.exports = Router;