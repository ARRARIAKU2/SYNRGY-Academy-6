import express from "express";
import path from "path";
import dotenv from "dotenv";

import db from "./db/sequelize/sequelize";
import { cars } from "./routes/api";

dotenv.config();

const app = express(); // instance express -> assign ke variabel app

const PORT = process.env.PORT;

const PUBLIC_DIR = path.join(__dirname, "public");

app.set("view engine", "ejs");
app.use(express.static(PUBLIC_DIR)); // membuat URL sendiri untuk apa saja

app.use(express.json()); // body json

app.use(
  express.urlencoded({
    extended: true,
  })
); // body urlencoded

app.use("/api/cars", cars);
// app.use('/api/books', books);

// db.sync()
//   .then(() => {
//     console.log("Connected to Database!");
//   })
//   .catch((err) => {
//     console.log("Failed to Connect Database! " + err.message);
//   });

try {
  // db.sync();
  db.authenticate()
    .then(() => {
      console.log("Connection to Database has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the Server:", error);
}

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
