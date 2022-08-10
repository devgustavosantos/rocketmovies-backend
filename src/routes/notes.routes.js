const { Router } = require("express");

const routes = Router();

const NotesControllers = require("../controllers/NotesControllers");

const notesControllers = new NotesControllers();

routes
    .post("/:user_id", notesControllers.create)
    .delete("/:id", notesControllers.delete)
    .get("/:id", notesControllers.show);

module.exports = routes;
