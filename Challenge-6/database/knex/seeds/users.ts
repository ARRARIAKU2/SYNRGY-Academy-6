import { Knex } from "knex";
import bcrypt from "bcrypt";

const password: string = await bcrypt.hash("pakjo123", 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "alana",
      email: "alana@yahoo.com",
      password: password,
      role: "superadmin",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
