const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

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

    async update(request, response) {
        const { id } = request.params;
        const { new_name, new_email, new_password, current_password } =
            request.body;

        const userInfos = await knex("users").where({ id }).first();

        let successfullyUpdated;
        let updatedData = { ...userInfos };

        if (!userInfos) {
            throw new AppError(
                "Este usuário não está cadastrado! Verifique as informações e tente novamente"
            );
        }

        if (new_name) {
            updatedData.name = new_name;
            successfullyUpdated = true;
        }

        if (new_email) {
            const emailAlreadyRegistered = await knex("users")
                .where({ email: new_email })
                .first();

            if (emailAlreadyRegistered) {
                throw new AppError(
                    "Este email já está registrado! Tente outro."
                );
            }

            updatedData.email = new_email;
            successfullyUpdated = true;
        }

        if (new_password) {
            if (!current_password) {
                throw new AppError(
                    "Para cadastrar uma nova senha, é necessário enviar a senha atual! Verifique e tente novamente."
                );
            }

            const currentPasswordIsRight = await compare(
                current_password,
                userInfos.password
            );

            if (!currentPasswordIsRight) {
                throw new AppError(
                    "A senha atual está incorreta! Verifique e tente novamente."
                );
            }

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
        }

        return response.status(201).json({
            status: 201,
            message: "O dados foram atualizados com sucesso!",
        });
    }
}

module.exports = UserControllers;
