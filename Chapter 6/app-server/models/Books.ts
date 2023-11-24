import { IRestModel, TParams } from "../interfaces/IRest";
import database from "../config/database";

export interface IBooks {
  id: string;
  title: string;
  author: string;
  published_year: string;
  total_copies: string;
  copies_available: string;
  genre: string;
  picture: string;
}

class Books implements IRestModel<IBooks> {
  constructor() {}
  async list(params?: TParams) {
    const data = await database
      .select("*")
      .from("books")
      .limit(params?.size || 10);
    return data;
  }
  async show(id: string) {
    const [item] = await database
      .select("*")
      .from("books")
      .where("id", "=", id);

    if (!item) {
      throw new Error(`Book with ID ${id} not found`);
    }

    return item;
  }
  async create(payload?: IBooks) {
    const [insertedData] = await database("books")
      .insert(payload)
      .returning("*");

    if (!insertedData) {
      throw new Error("Failed to retrieve inserted data");
    }

    return insertedData;
  }
  async update(id: string, payload?: IBooks) {
    const updatedRows = await database("books")
      .where("id", "=", id)
      .update(payload);

    // Assuming your database library supports returning the updated data
    if (updatedRows > 0) {
      const updatedBook = await database
        .select("*")
        .from("books")
        .where("id", "=", id);
      return updatedBook[0]; // Return the first item in the array (assuming id is unique)
    } else {
      throw new Error(`Book with ID ${id} not found`);
    }
  }

  async delete(id: string) {
    // Assuming your database library supports returning the deleted data
    const [deletedBook] = await database
      .select("*")
      .from("books")
      .where("id", "=", id)
      .del()
      .returning("*");

    if (!deletedBook) {
      throw new Error(`Book with ID ${id} not found`);
    }

    return deletedBook;
  }
}

export default new Books();
