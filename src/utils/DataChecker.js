const AppError = require("./AppError");

class DataChecker {
    stringChecker(string, message) {
        const isTheStringEmpty = !string;

        if (isTheStringEmpty) throw new AppError(message);
    }

    arrayChecker(array, message) {
        const isTheArrayEmpty = array.length < 1;

        if (isTheArrayEmpty) throw new AppError(message);
    }

    userExists(user) {
        const errorMessage =
            "Este usuário não está cadastrado! Verifique as informações e tente novamente.";

        this.stringChecker(user, errorMessage);
    }

    usersExists(usersInfos) {
        const errorMessage =
            "Não há usuários cadastrados! Cadastre um usuário e tente novamente.";

        this.arrayChecker(usersInfos, errorMessage);
    }

    noteExist(note) {
        const errorMessage =
            "Esta nota não está cadastrada! Verifique as informações e tente novamente.";

        this.stringChecker(note, errorMessage);
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
        const errorMessage = "Este usuário não possui tags cadastradas.";

        this.arrayChecker(tags, errorMessage);
    }

    tagExist(tag) {
        const errorMessage = "Esta tag não está cadastrada.";

        this.stringChecker(tag, errorMessage);
    }

    isTheTagEmpty(tag) {
        const errorMessage =
            "Não é possível atualizar a tag pois o nome está vazio.";

        this.stringChecker(tag, errorMessage);
    }
}

module.exports = DataChecker;
