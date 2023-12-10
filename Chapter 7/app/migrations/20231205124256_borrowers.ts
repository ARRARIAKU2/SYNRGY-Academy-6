import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("borrower", (builder) => {
    builder.increments("id").primary().notNullable();
    builder.string("first_name").notNullable();
    builder.string("last_name");
    builder.string("email").unique().notNullable();
    builder.string("phone").unique().notNullable();
    builder.text("address").notNullable();
    builder.dateTime("createdAt").defaultTo(new Date().toISOString());
    builder.dateTime("updatedAt").defaultTo(new Date().toISOString());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("borrower");
}
