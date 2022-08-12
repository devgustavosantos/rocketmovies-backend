const knex = require("../database/knex");
const DataChecker = require("../utils/DataChecker");
const dataChecker = new DataChecker();

class NotesControllers {
    async create(request, response) {
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        const userInfos = await knex("users").where({ id: user_id }).first();

        dataChecker.userExists(userInfos);
        dataChecker.isTheTitleOfTheNoteEmpty(title);
        dataChecker.isANumber(rating);

        const formattedTitle = title.trim();
        const formattedDescription = description.trim();

        const note_id = await knex("notes").insert({
            title: formattedTitle,
            description: formattedDescription,
            rating,
            user_id,
        });

        const tagsOfThisNote = tags.map(tag => {
            const formattedTag = tag.trim();

            return {
                note_id,
                user_id,
                name: formattedTag,
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
            const formattedTitle = title.trim();

            newNoteInfo.title = formattedTitle;
            noteHasBeenUpdatedSuccessfully = true;
        }

        if (description) {
            const formattedDescription = description.trim();

            newNoteInfo.description = formattedDescription;
            noteHasBeenUpdatedSuccessfully = true;
        }

        if (rating) {
            dataChecker.isANumber(rating);
            newNoteInfo.rating = rating;
            noteHasBeenUpdatedSuccessfully = true;
        }

        if (tags) {
            const newTagsOfThisNote = tags.map(tag => {
                const formattedTag = tag.trim();

                return {
                    note_id: id,
                    user_id: noteInfos.user_id,
                    name: formattedTag,
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

            return response.status(201).json({
                status: 200,
                message: "A nota foi atualizada com sucesso.",
            });
        }

        return response.status(400).json({
            status: 400,
            message: `É necessário ao menos uma informação para atualizar!
                    Por favor verifique e tente novamente.`,
        });
    }

    async index(request, response) {
        const { user_id, title, rating, tags } = request.query;

        const userInfos = await knex("users").where({ id: user_id }).first();

        dataChecker.userExists(userInfos);

        let notes;
        let ratingsInserts;
        let tagsInserts;

        const queryType = {
            allTypesOfFilters: tags && rating && title,

            titleAndRating: title && rating && !tags,
            titleAndTag: title && tags && !rating,
            ratingAndTag: rating && tags && !title,

            titleOnly: title && !tags && !rating,
            ratingOnly: rating && !title && !tags,
            tagOnly: tags && !title && !rating,

            withoutFilters: !tags && !rating && !title,
        };

        if (rating) {
            ratingsInserts = rating.split(",").map(r => r.trim());

            dataChecker.onlyNumbers(ratingsInserts);
        }

        if (tags) {
            tagsInserts = tags.split(",").map(tag => tags.trim());
        }

        if (queryType.allTypesOfFilters) {
            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.description",
                    "notes.rating",
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("notes.rating", ratingsInserts)
                .whereIn("name", tagsInserts)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.updated_at");
        }

        if (queryType.titleAndRating) {
            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .whereIn("rating", ratingsInserts)
                .orderBy("updated_at");
        }

        if (queryType.titleAndTag) {
            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.description",
                    "notes.rating",
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", tagsInserts)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.updated_at");
        }

        if (queryType.ratingAndTag) {
            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.description",
                    "notes.rating",
                ])
                .where("notes.user_id", user_id)
                .whereIn("notes.rating", ratingsInserts)
                .whereIn("name", tagsInserts)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.updated_at");
        }

        if (queryType.titleOnly) {
            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("updated_at");
        }

        if (queryType.ratingOnly) {
            notes = await knex("notes")
                .where({ user_id })
                .whereIn("rating", ratingsInserts)
                .orderBy("updated_at");
        }

        if (queryType.tagOnly) {
            console.log("chegou aqui");
            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.description",
                    "notes.user_id",
                ])
                .where("notes.user_id", user_id)
                .whereIn("name", tagsInserts)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.updated_at");
        }

        if (queryType.withoutFilters) {
            notes = await knex("notes")
                .where({ user_id })
                .orderBy("updated_at");
        }

        dataChecker.didTheSearchGetResults(notes);

        return response.status(201).json(notes);
    }
}

module.exports = NotesControllers;
