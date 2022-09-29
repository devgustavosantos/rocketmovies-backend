const knex = require("../database/knex");
const DataChecker = require("../utils/DataChecker");
const dataChecker = new DataChecker();

class NotesControllers {
  async create(request, response) {
    const user_id = request.user.id;
    const { title, description, rating, tags } = request.body;

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

    const tagsOfThisNote = tags.map((tag) => {
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

  async index(request, response) {
    const { title } = request.query;
    const user_id = request.user.id;

    const userInfos = await knex("users").where({ id: user_id }).first();

    const notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("updated_at");

    const tags = await knex("tags").where({ user_id });

    const notesWithTags = notes.map((note) => {
      const tagsOfThisNote = tags.filter((tag) => tag.note_id == note.id);

      return {
        ...note,
        tags: tagsOfThisNote,
      };
    });

    dataChecker.didTheSearchGetResults(notes);

    return response.status(201).json(notesWithTags);
  }
}

module.exports = NotesControllers;
