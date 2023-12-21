import express, { Express } from "express";
import path from "path";
import dotenv from "dotenv";
import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";

// import db from "./database/sequelize/sequelize";
import ApiCars from "./routes/cars.route";
import ApiUsers from "./routes/users.route";
import ApiAuth from "./routes/auth.route"

const swaggerDocument = YAML.load("./openapi.yaml");

dotenv.config();

const PORT = process.env.PORT;

const PUBLIC_DIR = path.join(__dirname, "public");

class Server {
  private app: Express;

  constructor() {
    this.app = express();

    this.app.set("view engine", "ejs");
    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api/cars", ApiCars.routes());
    this.app.use("/api/users", ApiUsers.routes());
    this.app.use("/api", ApiAuth.routes());
    this.app.use(
      "/open-api",
      SwaggerUI.serve,
      SwaggerUI.setup(swaggerDocument)
    );
  }

  run() {
    try {
      // db.authenticate()
      //   .then(() => {
      //     console.log(
      //       "Connection to Database has been established successfully."
      //     );
      //   })
      //   .catch((error) => {
      //     console.error("Unable to connect to the database: ", error);
      //   });

      this.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Unable to connect to the Server:", error);
    }
  }
}

new Server().run();
