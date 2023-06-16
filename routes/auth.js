const route = require("express").Router();
const bodyParser = require("body-parser");
const authController = require("../controller/auth.controller");
route.post("/signup", bodyParser.json(), authController.signup);
route.post("/signin", bodyParser.json(), authController.signin);
route.get("/get-users", bodyParser.json(), authController.getUsers);
module.exports = route;
