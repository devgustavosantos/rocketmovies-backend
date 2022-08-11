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

    onlyNumbers(numbers) {
        const thereIsNotOnlyNumbers = numbers.find(number => isNaN(number));

        if (thereIsNotOnlyNumbers) {
            throw new AppError(
                "Somente números são aceitos no campo rating. Tente novamente."
            );
        }
    }

    isANumber(rating) {
        if (isNaN(rating)) {
            throw new AppError(
                "Somente um número é aceito no campo rating. Tente novamente."
            );
        }
    }

    areThereTagsRegistered(tags) {
        const isThereAtLeastOneTag = tags.length > 0;

        if (!isThereAtLeastOneTag)
            throw new AppError("Este usuário não possui tags cadastradas.");
    }

    tagExist(tag) {
        if (!tag) throw new AppError("Esta tag não está cadastrada.");
    }
}

module.exports = DataChecker;
