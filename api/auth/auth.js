const Express = require("express");
const Register = require("./register/register");
const Login = require("./login/login");

const Router = Express.Router();

Router.post("/register", Register);
Router.post("/login", Login);

module.exports = Router;