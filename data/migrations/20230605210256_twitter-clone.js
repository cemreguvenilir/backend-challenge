/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
    })
    .createTable("tweets", (table) => {
      table.increments("tweet_id");
      table.string("img_url");
      table.string("text").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("favorites", (table) => {
      table.increments("favorites_id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("tweet_id")
        .notNullable()
        .references("tweet_id")
        .inTable("tweets")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("favorites")
    .dropTableIfExists("tweets")
    .dropTableIfExists("users");
};
