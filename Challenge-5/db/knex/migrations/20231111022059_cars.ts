import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cars", function (table) {
    table.increments("id").primary();
    table.string("title");
    table.string("price");
    table.string("picture");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("cars");
}
