import Knex from "knex";
import KnexConfigurator from "./knexfile";

class Database {
  private database;
  constructor() {
    this.database = Knex(
      KnexConfigurator[process.env.NODE_ENV || "development"]
    );
  }

  get dbKnex() {
    return this.database;
  }
}

const db = new Database();
export default db.dbKnex;
