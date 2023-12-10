import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("book", (builder) => {
    builder.increments("id").primary().notNullable();
    builder.string("title").notNullable();
    builder.string("author").notNullable();
    builder.string("isbn").notNullable();
    builder.string("published_year").notNullable();
    builder.string("genre").notNullable();
    builder.integer("total_copies").defaultTo(0);
    builder.integer("copies_available").defaultTo(0);
    builder.timestamp("created_at").notNullable();
    builder.timestamp("updated_at").nullable();
    builder.integer("created_by").references("id").inTable("users");
    builder.integer("updated_by").references("id").inTable("users");
    builder.boolean("published").defaultTo(false);
    builder.json("cover").defaultTo(null).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("book");
}
