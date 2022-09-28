const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfigs = require("../configs/auth");

class SessionsControllers {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorretos!");
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("E-mail e/ou senha incorretos!");
    }

    const { secret, expiresIn } = authConfigs.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const onlyNecessaryInformation = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return response.json({ user: onlyNecessaryInformation, token });
  }
}

module.exports = SessionsControllers;
