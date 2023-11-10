const Router = require('express').Router;
const storage = require('../../../storage');
const upload = require('../../../upload');

const db = require('../../../config/database');

// /api/books
function ApiRouterBook() {
  const router = Router(); // instance dari function Router

  // Render
  router.get('/books', (req, res) => {
    res.render('books', {
      title: 'Books',
    });
  })

  // List
  router.get('/', async (req, res) => {
    try {
      const data = await db.select('*').from('books');

      console.log(data);
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    };
  });

  // Single
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await db.select('*').from('books').where('books_id', '=', id);

      res.status(200).json({
        data: data[0],
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    };
  });

  // Create
  router.post('/', upload.single('picture'), async (req, res) => {
    try {
      let title = req.body.title;
      let author = req.body.author;
      let isbn = req.body.isbn;
      let published_year = req.body.published_year;
      let genre = req.body.genre;
      let copies_available = req.body.copies_available;
      let total_copies = req.body.total_copies;

      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const pictureUrl = storage.uploader.upload(file, (err, result) => {
        if (err) {
          alert('Gagal Upload File!');
          res.status(400).json({
            message: "Upload Failed!"
          });
          return;
        };
        return result
      });

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      const data = await db('books').insert({
        title: title,
        author: author,
        isbn: isbn,
        published_year: published_year,
        genre: genre,
        copies_available: copies_available,
        total_copies: total_copies,
        picture: picture
      });

      res.status(201).json({
        message: "Create Success!",
        title,
        author,
        isbn,
        published_year,
        genre,
        copies_available,
        total_copies,
        picture
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Terjadi Kesalahan Pada Server!",
      });
    };
  });

  // Update
  router.put('/:id', upload.single('picture'), async (req, res) => {
    try {
      const id = req.params.id;

      let title = req.body.title;
      let author = req.body.author;
      let isbn = req.body.isbn;
      let published_year = req.body.published_year;
      let genre = req.body.genre;
      let copies_available = req.body.copies_available;
      let total_copies = req.body.total_copies;

      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const pictureUrl = storage.uploader.upload(file, (err, result) => {
        if (err) {
          alert('Gagal Upload File!');
          res.status(400).json({
            message: "Upload Failed!"
          });
          return;
        };
        return result
      });

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      const data = await db('books').where('books_id', '=', id).update({
        title: title,
        author: author,
        isbn: isbn,
        published_year: published_year,
        genre: genre,
        copies_available: copies_available,
        total_copies: total_copies,
        picture: picture
      });

      res.status(201).json({
        message: "Update Success!",
        title,
        author,
        isbn,
        published_year,
        genre,
        copies_available,
        total_copies,
        picture
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    };
  });

  // Delete
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await db('books').where('books_id', '=', id).del();

      res.status(201).json({
        message: "Delete Success!",
        data
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    };
  });

  return router;
};

module.exports = ApiRouterBook;
