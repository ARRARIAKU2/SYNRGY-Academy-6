import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        {title: "Car 1",
        price: "100",
        picture: "test",
        created_at: new Date(),
        updated_at: new Date()},
    ]);
};
