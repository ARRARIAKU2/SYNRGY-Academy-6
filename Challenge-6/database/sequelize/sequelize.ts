import { Sequelize } from "sequelize";

class Database {
  private sequelize;
  constructor() {
    this.sequelize = new Sequelize({
      dialect: "postgres",
      host: "localhost",
      username: "postgres",
      password: "docker",
      database: "postgres",
      port: 5432,
    });
  }

  get dbSequelize() {
    return this.sequelize;
  }
}
const db = new Database();
export default db.dbSequelize;
