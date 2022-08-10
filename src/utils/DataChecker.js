const AppError = require("./AppError");

class DataChecker {
    user(userInfos) {
        if (!userInfos) {
            throw new AppError(
                "Este usuário não está cadastrado! Verifique as informações e tente novamente."
            );
        }
    }

    users(usersInfos) {
        const thereAreRegisteredUsers = usersInfos.length > 0;

        if (!thereAreRegisteredUsers) {
            throw new AppError(
                "Não há usuários cadastrados! Cadastre um usuário e tente novamente."
            );
        }
    }
}

module.exports = DataChecker;
