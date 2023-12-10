import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", function (table) {
    table.increments("id").primary().notNullable();
    table.string("username").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("role").defaultTo("member");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
