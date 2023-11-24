import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();

interface KnexConfig {
  [key: string]: Knex.Config;
}

class KnexConfigurator {
  private environments: string[] = ["development", "staging", "production"];
  private connection: Knex.ConnectionConfig = {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "docker",
  };
  private commonConfig: Knex.Config = {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "docker",
      database: process.env.DB_NAME || "postgres",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  };

  public getConfig(): KnexConfig {
    return Object.fromEntries(
      this.environments.map((env: string) => [env, this.commonConfig])
    );
  }
}

const knexConfigurator = new KnexConfigurator();
export default knexConfigurator.getConfig();
