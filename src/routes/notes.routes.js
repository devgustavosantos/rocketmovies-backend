const { Router } = require("express");

const routes = Router();

const NotesControllers = require("../controllers/NotesControllers");

const notesControllers = new NotesControllers();

routes.post("/:user_id", notesControllers.create);

module.exports = routes;
