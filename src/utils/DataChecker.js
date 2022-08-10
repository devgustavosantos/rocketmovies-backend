const AppError = require("./AppError");

class DataChecker {
    userExists(user) {
        if (!user) {
            throw new AppError(
                "Este usuário não está cadastrado! Verifique as informações e tente novamente."
            );
        }
    }

    usersExists(usersInfos) {
        const thereAreRegisteredUsers = usersInfos.length > 0;

        if (!thereAreRegisteredUsers) {
            throw new AppError(
                "Não há usuários cadastrados! Cadastre um usuário e tente novamente."
            );
        }
    }

    noteExist(note) {
        if (!note) {
            throw new AppError(
                "Esta nota não está cadastrada! Verifique as informações e tente novamente."
            );
        }
    }

    noteBelongsToThisUser(userId, noteId) {
        const idsMatch = userId == noteId;

        if (!idsMatch) {
            throw new AppError(
                "Esta nota não não pertence a este usuário! Verifique as informações e tente novamente."
            );
        }
    }
}

module.exports = DataChecker;
