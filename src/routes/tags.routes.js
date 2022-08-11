const { Router } = require("express");

const TagsControllers = require("../controllers/TagsControllers");

const routes = Router();

const tagsControllers = new TagsControllers();

routes
    .get("/:user_id", tagsControllers.index)
    .get("/specific/:id", tagsControllers.show)
    .delete("/specific/:id", tagsControllers.delete)
    .put("/specific", tagsControllers.update);

module.exports = routes;
