import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "alana",
      email: "alana@yahoo.com",
      password: "pakjo123",
      role: "superadmin",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
