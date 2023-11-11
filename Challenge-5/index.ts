import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { cars } from "./routes/api";

dotenv.config();

const PORT = process.env.PORT;

const app = express(); // instance express -> assign ke variabel app

const PUBLIC_DIR = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.use(express.static(PUBLIC_DIR)); // membuat URL sendiri untuk apa saja
// yang ada di dalam folder PUBLIC_DIR -> "public"

app.use(express.json()); // body json

app.use(
  express.urlencoded({
    extended: true,
  })
); // body urlencoded

app.use('/api/cars', cars);
// app.use('/api/cars', api.cars());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
