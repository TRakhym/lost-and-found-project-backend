const Dotenv = require('dotenv')
const Express = require('express')


Dotenv.config()
const App = Express()


function showMessage(request, response){
  response.send('Server is Working')
}
App.get('/', showMessage);


function link(){
  console.log('http://localhost:'+process.env.port);
}
App.listen(process.env.port, link);