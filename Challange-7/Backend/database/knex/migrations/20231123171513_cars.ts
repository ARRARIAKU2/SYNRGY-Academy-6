import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cars", function (table) {
    table.increments("id").primary().notNullable();
    table.string("title").notNullable();
    table.string("price").notNullable();
    table.string("picture").notNullable();
    table.boolean("available").defaultTo(true);
    table.string("status").defaultTo("available");
    table.string("created_by").notNullable();
    table.string("edited_by").notNullable();
    table.string("deleted_by").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("cars");
}
