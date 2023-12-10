import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("user", (builder) => {
    builder.increments("id").primary().notNullable();
    builder.string("username").unique().notNullable();
    builder.string("email").unique().notNullable();
    builder.text("password").notNullable();
    builder.string("role").defaultTo("member");
    builder.dateTime("createdAt").defaultTo(new Date().toISOString());
    builder.dateTime("updatedAt").defaultTo(new Date().toISOString());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("user");
}
