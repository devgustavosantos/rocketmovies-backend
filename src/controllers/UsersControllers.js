const AppError = require("../utils/AppError");

class UserControllers {
    async create(request, response) {
        return response.status(200).json();
    }
}

module.exports = UserControllers;
