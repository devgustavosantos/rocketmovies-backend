const { Router } = require("express");
const routes = Router();

const UserControllers = require("../controllers/UsersControllers");
const usersControllers = new UserControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.post("/", usersControllers.create).put("/:id", usersControllers.update);

module.exports = routes;
