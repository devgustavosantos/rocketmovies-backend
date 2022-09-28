const DataChecker = require("../utils/DataChecker");
const dataChecker = new DataChecker();
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UserControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    dataChecker.hasAllDataBeenSent([name, email, password]);

    const consultEmail = await knex("users").where({ email }).first();

    dataChecker.emailAlreadyRegistered(consultEmail);

    const encryptedPassword = await hash(password, 8);

    const formattedName = name.trim();
    const formattedEmail = email.trim();

    await knex("users").insert({
      name: formattedName,
      email: formattedEmail,
      password: encryptedPassword,
    });

    return response.status(201).json({
      status: 201,
      message: "O usuário foi cadastrado com sucesso!",
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { new_name, new_email, new_password, current_password } =
      request.body;

    const userInfos = await knex("users").where({ id }).first();

    let successfullyUpdated;
    let updatedData = { ...userInfos };

    dataChecker.userExists(userInfos);

    if (new_name) {
      const formattedName = new_name.trim();
      updatedData.name = formattedName;
      successfullyUpdated = true;
    }

    if (new_email) {
      const emailAlreadyRegistered = await knex("users")
        .where({ email: new_email })
        .first();

      dataChecker.emailAlreadyRegistered(emailAlreadyRegistered);

      const newFormattedEmail = new_email.trim();

      updatedData.email = newFormattedEmail;
      successfullyUpdated = true;
    }

    if (new_password) {
      dataChecker.wasTheCurrentPasswordSent(current_password);

      const passwordComparison = await compare(
        current_password,
        userInfos.password
      );

      dataChecker.doThePasswordsMatch(passwordComparison);

      const newPasswordEncrypted = await hash(new_password, 8);

      updatedData.password = newPasswordEncrypted;
      successfullyUpdated = true;
    }

    if (successfullyUpdated) {
      await knex("users").where({ id }).update({
        name: updatedData.name,
        email: updatedData.email,
        password: updatedData.password,
        updated_at: knex.fn.now(),
      });

      return response.status(201).json({
        status: 201,
        message: "O dados foram atualizados com sucesso!",
      });
    }

    dataChecker.noDataWasSent();
  }
}

module.exports = UserControllers;
