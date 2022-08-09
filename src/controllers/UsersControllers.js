const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UserControllers {
    async create(request, response) {
        const { name, email, password } = request.body;

        const missingData = !name || !email || !password;

        if (missingData) {
            throw new AppError(
                "Dados estão faltando! Verifique as informações e tente novamente."
            );
        }

        const consultEmail = await knex("users").where({ email });

        const emailAlreadyRegistered = consultEmail.length > 0;

        if (emailAlreadyRegistered) {
            throw new AppError("Este email já está registrado! Tente outro.");
        }

        const encryptedPassword = await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            password: encryptedPassword,
        });

        return response.status(201).json({
            status: 201,
            message: "O usuário foi cadastrado com sucesso",
        });
    }
}

module.exports = UserControllers;
