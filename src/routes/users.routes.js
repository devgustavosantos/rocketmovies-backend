const { Router } = require("express");

const UserControllers = require("../controllers/UsersControllers");

const routes = Router();

const usersControllers = new UserControllers();

routes.post("/", usersControllers.create);
routes.put("/:id", usersControllers.update);

module.exports = routes;
