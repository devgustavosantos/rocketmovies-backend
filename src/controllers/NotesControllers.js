const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DataChecker = require("../utils/DataChecker");
const dataChecker = new DataChecker();

class NotesControllers {
    async create(request, response) {
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        const userInfos = await knex("users").where({ id: user_id }).first();

        dataChecker.user(userInfos);

        const note_id = await knex("notes").insert({
            title,
            description,
            rating,
            user_id,
        });

        const tagsOfThisNote = tags.map(tag => {
            return {
                note_id,
                user_id,
                name: tag,
            };
        });

        await knex("tags").insert(tagsOfThisNote);

        return response.status(201).json({
            status: 201,
            message: "A nota foi cadastrada com sucesso.",
        });
    }
}

module.exports = NotesControllers;
