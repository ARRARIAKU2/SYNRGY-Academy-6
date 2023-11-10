import express from 'express';
import path from 'path';
import router from "./routes/api/cars/cars";

const app = express(); // instance express -> assign ke variabel app

const { PORT = 8000 } = process.env;
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

app.use('/api/cars', router);
// app.use('/api/cars', api.cars());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
