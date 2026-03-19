const Express = require('express')

const GetMyClaims = require('./get_my_claims/get_my_claims')
const UpdateClaim = require("./update_claim/update_claim")

const Router = Express.Router()

Router.get('/my', GetMyClaims)
Router.patch('/:id', UpdateClaim)

module.exports = Router