import express, { Request, Response } from 'express';
import storage from '../../../storage';
import upload from '../../../upload';
import db from '../../../config/database';

// /api/books
  const router = express.Router(); // instance dari function Router

  // Render
  router.get('/cars', (req: Request, res: Response) => {
    res.render('cars', {
      title: 'Cars',
    });
  })

  // List
  router.get('/', async (req: Request, res: Response) => {
    try {
      const data = await db.select('*').from('cars');

      console.log(data);
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    };
  });

  // Single
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await db.select('*').from('books').where('books_id', '=', id);

      res.status(200).json({
        data: data[0],
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    };
  });

  // Create
  router.post('/', upload.single('picture'), async (req: Request, res: Response) => {
    try {
      if (!req.file || !req.file.buffer) {
        throw new Error('File buffer is undefined');
      }
  
      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
  
      const pictureUrl = await storage.uploader.upload(file);
  
      console.log(pictureUrl.url);
  
      const picture = pictureUrl.url;

      const {title, price, create_at, update_at } = req.body;
      const data = await db('books').insert({
        title: title,
        price: price,
        create_at: create_at,
        update_at: update_at,
        picture: picture
      });
  
      res.status(201).json({
        message: "Create Success!",
        title,
        price,
        create_at,
        update_at,
        picture
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Terjadi Kesalahan Pada Server!",
      });
    }
  });
  
  

  // Update
  router.put('/:id', upload.single('picture'), async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!req.file || !req.file.buffer) {
        throw new Error('File buffer is undefined');
      }
  
      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
  
      const pictureUrl = await storage.uploader.upload(file);

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      const {title, price, create_at, update_at } = req.body;
      const data = await db('books').where('books_id', '=', id).update({
        title: title,
        price: price,
        create_at: create_at,
        update_at: update_at,
        picture: picture
      });

      res.status(201).json({
        message: "Update Success!",
        title,
        price,
        create_at,
        update_at,
        picture
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    };
  });

  // Delete
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await db('books').where('books_id', '=', id).del();

      res.status(201).json({
        message: "Delete Success!",
        data
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    };
  });

export default router;