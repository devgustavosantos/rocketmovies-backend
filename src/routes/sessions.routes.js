const { Router } = require("express");

const routes = Router();

const SessionsControllers = require("../controllers/SessionsControllers");

const sessionsControllers = new SessionsControllers();

routes.post("/", sessionsControllers.create);

module.exports = routes;
