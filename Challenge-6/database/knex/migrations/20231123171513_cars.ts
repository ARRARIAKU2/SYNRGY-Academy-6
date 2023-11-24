import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cars", function (table) {
    table.increments("id").primary().notNullable();
    table.string("created_by").notNullable();
    table.string("title");
    table.string("price");
    table.string("picture");
    table.boolean("available");
    table.string("status");
    table.string("deleted_by");
    table.string("edited_by");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("cars");
}
