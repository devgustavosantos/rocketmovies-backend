const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DataChecker = require("../utils/DataChecker");
const dataChecker = new DataChecker();

class NotesControllers {
    async create(request, response) {
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        const userInfos = await knex("users").where({ id: user_id }).first();

        dataChecker.userExists(userInfos);

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

    async delete(request, response) {
        const { id } = request.params;

        const noteInfos = await knex("notes").where({ id }).first();

        dataChecker.noteExist(noteInfos);

        await knex("notes").where({ id }).delete();

        return response.status(201).json({
            status: 201,
            message: "A nota foi deletada com sucesso.",
        });
    }

    async show(request, response) {
        const { id } = request.params;

        const noteInfos = await knex("notes").where({ id }).first();

        dataChecker.noteExist(noteInfos);

        const tagsOfThisNote = await knex("tags").where({ note_id: id });

        return response.status(202).json({
            ...noteInfos,
            tags: tagsOfThisNote,
        });
    }

    async update(request, response) {}
}

module.exports = NotesControllers;
