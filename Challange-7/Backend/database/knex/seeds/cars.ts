import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      title: "BMW",
      price: "1000000",
      picture: "url",
      available: true,
      status: "available",
      created_by: "alana",
      deleted_by: "alana",
      edited_by: "alana",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
