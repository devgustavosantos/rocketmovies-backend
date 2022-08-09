const { Router } = require("express");

const UserControllers = require("../controllers/UsersControllers");

const routes = Router();

const usersControllers = new UserControllers();

routes.get("/", usersControllers.create);

module.exports = routes;
