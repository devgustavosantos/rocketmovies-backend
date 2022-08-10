exports.up = knex =>
    knex.schema.alterTable("notes", table => {
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .alter();
    });

exports.down = knex =>
    knex.schema.alterTable("notes", table => {
        table.integer("user_id").references("id").inTable("users").alter();
    });
