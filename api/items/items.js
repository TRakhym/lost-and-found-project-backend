const Express = require('express')
const CreateItem = require('./create_item/create_item')
const GetItems = require('./get_items/get_items')
const GetMyItems = require('./get_my_items/get_my_items')
const GetItem = require('./get_item/get_item')
const DeleteItem = require('./delete_item/delete_item')

const upload = require('../functions/upload')

const Router = Express.Router()

Router.post('/', upload.array('images', 5), CreateItem)
Router.get('/', GetItems)
Router.get('/my', GetMyItems)
Router.get('/:id', GetItem)
Router.delete('/:id', DeleteItem)

module.exports = Router;