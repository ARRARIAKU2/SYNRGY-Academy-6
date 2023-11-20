import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      title: "Car 2",
      price: "200",
      picture: "testis",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
