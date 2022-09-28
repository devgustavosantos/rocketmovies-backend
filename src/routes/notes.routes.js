const { Router } = require("express");
const { route } = require("express/lib/router");

const routes = Router();
const NotesControllers = require("../controllers/NotesControllers");
const notesControllers = new NotesControllers();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.use(ensureAuthenticated);
routes
  .post("/", notesControllers.create)
  .delete("/:id", notesControllers.delete)
  .get("/:id", notesControllers.show)
  .get("/", notesControllers.index);

module.exports = routes;
