const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class UsersAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFile = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const fileName = await diskStorage.saveFile(avatarFile);

    user.avatar = fileName;

    await knex("users").where({ id: user_id }).update(user);

    const onlyNecessaryInformation = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return response.json({ user: onlyNecessaryInformation });
  }
}

module.exports = UsersAvatarController;
