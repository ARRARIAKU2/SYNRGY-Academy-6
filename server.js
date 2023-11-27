const express = require('express'); // third-party module
const jwt = require('jsonwebtoken');

const path = require('path'); // core module
const routes = require('./routes');
const api = require('./routes/api');

const app = express(); // instance express -> assign ke variabel app
const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.use(express.static(PUBLIC_DIR)); // membuat URL sendiri untuk apa saja
// yang ada di dalam folder PUBLIC_DIR -> "public"

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

function checkAuthorization(req, res, next) {
  const headers = req.headers;

  if (!(headers && headers.authorization)) {
    return res.status(403).json({
      meta: {
        message: 'not authorized',
        success: false,
        code: 403,
      },
      data: null,
    });
  }

  const decode = jwt.verify(
    headers.authorization,
    'JWT_KEY',
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          meta: {
            message: err.message,
            code: 403,
            success: false,
          },
          data: null,
        });
      }
      return decoded;
    }
  );
  req.user = decode;
  next();
}

app.get('/api/books', checkAuthorization, (req, res) => {
  console.log('user access > ', req.user);
  res.status(200).json({
    meta: {
      message: 'fetch data buku berhasil',
      success: true,
      code: 200,
    },
    data: [
      {
        id: 1,
        author: 'ahmad',
        title: 'Belajar Authentikasi',
        isbn: '1234:1234',
        published_year: '2023',
        total_copies: 10,
        copies_available: 3,
        genre: 'education',
      },
    ],
  });
});

app.get('/api/borrowers', checkAuthorization, (req, res) => {
  res.status(200).json({
    meta: {
      message: 'fetch data peminjam buku berhasil',
      success: true,
      code: 200,
    },
    data: [
      {
        id: 1,
        email: 'handoyo@mail.com',
        full_name: 'Handoyo',
        phone: '12345',
        address: 'Jakarta',
      },
    ],
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'fadli' && password === '12341234') {
    const token = jwt.sign(
      {
        username,
        email: 'fadli@mail.com',
        phone: '0812341234',
      },
      'JWT_KEY',
      {
        expiresIn: '1h',
      }
    );
    return res.status(200).json({
      meta: {
        message: 'login success',
        success: true,
        code: 200,
      },
      data: {
        token: token,
      },
    });
  }

  res.status(403).json({
    message: 'login gagal',
  });
});

// app.use('/api/books', api.books());
// app.use('/books', routes.books());

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:%d', PORT);
});
