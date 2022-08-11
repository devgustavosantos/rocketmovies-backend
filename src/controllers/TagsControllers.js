const knex = require("../database/knex");
const DataChecker = require("../utils/DataChecker");
const dataChecker = new DataChecker();

class TagsControllers {
    async index(request, response) {
        const { user_id } = request.params;

        const userInfos = await knex("users").where({ id: user_id }).first();

        dataChecker.userExists(userInfos);

        const registeredTags = await knex("tags").where({ user_id });

        dataChecker.areThereTagsRegistered(registeredTags);

        return response.status(201).json({ tags: registeredTags });
    }
}

module.exports = TagsControllers;
