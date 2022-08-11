const { Router } = require("express");

const TagsControllers = require("../controllers/TagsControllers");

const routes = Router();

const tagsControllers = new TagsControllers();

routes.get("/:user_id", tagsControllers.index);

module.exports = routes;
