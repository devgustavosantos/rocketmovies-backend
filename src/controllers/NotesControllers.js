const knexfile = require("../../knexfile");
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

    async update(request, response) {
        const { id } = request.params;
        const { title, description, rating, tags } = request.body;

        const noteInfos = await knex("notes").where({ id }).first();

        dataChecker.noteExist(noteInfos);

        let noteHasBeenUpdatedSuccessfully;
        let newNoteInfo = { ...noteInfos };

        if (title) {
            newNoteInfo.title = title;
            noteHasBeenUpdatedSuccessfully = true;
        }

        if (description) {
            newNoteInfo.description = description;
            noteHasBeenUpdatedSuccessfully = true;
        }

        if (rating) {
            newNoteInfo.rating = rating;
            noteHasBeenUpdatedSuccessfully = true;
        }

        if (tags) {
            const newTagsOfThisNote = tags.map(tag => {
                return {
                    note_id: id,
                    user_id: noteInfos.user_id,
                    name: tag,
                };
            });

            await knex("tags").where({ note_id: noteInfos.id }).delete();

            await knex("tags").insert(newTagsOfThisNote);

            noteHasBeenUpdatedSuccessfully = true;
        }

        if (noteHasBeenUpdatedSuccessfully) {
            await knex("notes").where({ id }).update({
                title: newNoteInfo.title,
                description: newNoteInfo.description,
                rating: newNoteInfo.rating,
                updated_at: knex.fn.now(),
            });

            return response.status(200).json({
                status: 200,
                message: "A nota foi atualizada com sucesso.",
            });
        } else {
            return response.status(400).json({
                status: 400,
                message: `É necessário ao menos uma informação para atualizar!
                    Por favor verifique e tente novamente.`,
            });
        }
    }
}

module.exports = NotesControllers;
