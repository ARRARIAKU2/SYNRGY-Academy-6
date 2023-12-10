import database from "../config/database";
import { Model } from "objection";

Model.knex(database);

export interface IBooks {
  id?: string;
  title: string;
  author: string;
  published_year: string;
  total_copies: number;
  copies_available: number;
  genre: string;
  isbn: string;
  updatedBy?: string;
  createdBy?: string;
  cover?: string;
}

class Books extends Model {
  static get tableName() {
    return "book";
  }

  static get idColumn() {
    return "id";
  }

  $beforeInsert() {
    // @ts-ignore
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    // @ts-ignore
    this.updated_at = new Date().toISOString();
  }

  static get timestamps() {
    return true;
  }
}

export default Books;
