const { Router } = require("express");
const routes = Router();

const TagsControllers = require("../controllers/TagsControllers");
const tagsControllers = new TagsControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.get("/", ensureAuthenticated, tagsControllers.index);

module.exports = routes;
