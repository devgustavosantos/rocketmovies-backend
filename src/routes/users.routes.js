const { Router } = require("express");
const routes = Router();

const UserControllers = require("../controllers/UsersControllers");
const usersControllers = new UserControllers();
const UsersAvatarController = require("../controllers/UsersAvatarController");
const usersAvatarController = new UsersAvatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const multer = require("multer");
const uploadConfigs = require("../configs/upload");
const upload = multer(uploadConfigs.MULTER);

routes
  .post("/", usersControllers.create)
  .put("/", ensureAuthenticated, usersControllers.update)
  .patch(
    "/avatar",
    ensureAuthenticated,
    upload.single("avatar"),
    usersAvatarController.update
  );

module.exports = routes;
