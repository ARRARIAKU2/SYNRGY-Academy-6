const express = require('express'); // third-party
const storage = require('./storage'); // local
const upload = require('./upload'); // local
const path = require('path'); // core

const app = express();

const { PORT = 8000 } = process.env;
const PUBLIC_DIRECTORY = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.use(express.static(PUBLIC_DIRECTORY));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get('/upload', (req, res) => {
  res.render('upload', {
    type: req.query.type || ``,
    name: req.query.name || 'Guest',
    message: req.query.message || "tes",
    url: req.query.url || ``,
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;
  storage.uploader.upload(file, (err, result) => {
    if (err) {
      alert('gagal upload file');
      res.status(400).json({
        message: " gagal upload nya"
      })
      return;
    }
    return res.status(200).json({
      message: "Upload berhasil!",
      url: result.url,
    });
  });
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:%d', PORT);
});
