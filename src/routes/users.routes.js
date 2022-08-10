const { Router } = require("express");

const UserControllers = require("../controllers/UsersControllers");

const routes = Router();

const usersControllers = new UserControllers();

routes
    .post("/", usersControllers.create)
    .put("/:id", usersControllers.update)
    .get("/:id", usersControllers.show)
    .get("/", usersControllers.index)
    .delete("/:id", usersControllers.delete);

module.exports = routes;
