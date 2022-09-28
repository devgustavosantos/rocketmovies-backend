const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");
const authConfigs = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("É necessário enviar um token!");
  }

  try {
    const { sub: user_id } = verify(token, authConfigs.jwt.secret);

    request.user = {
      id: Number(user_id),
    };
    return next();
  } catch {
    throw new AppError("JWT inválido!");
  }
}

module.exports = ensureAuthenticated;
