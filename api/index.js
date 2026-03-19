require('dotenv').config()
const Express = require('express')

const Auth = require('./auth/auth')
const Users = require('./users/users')
const Items = require('./items/items')
const Claims = require('./claims/claims')

const { shield } = require('./functions/middleware')

const App = Express()

App.use(Express.json())
App.use(Express.urlencoded({ extended: true }))


App.use('/api/auth', Auth)
App.use('/api/users', shield, Users)
App.use('/api/items', shield, Items)
App.use('/api/claims', shield, Claims)


function showMessage(request, response){
  response.send('Server is Working on: '+process.env.PORT)
}
App.get('/', showMessage);


function link(){
  console.log('http://localhost:'+process.env.PORT);
}
App.listen(process.env.PORT, link);