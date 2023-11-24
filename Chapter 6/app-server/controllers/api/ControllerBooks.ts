import { Request, Response } from "express";

import { IRestController } from "../../interfaces/IRest";
import db from "../../config/database";
import Books, { IBooks } from "../../models/Books";
import Media from "../../config/media";

class ControllerBooks implements IRestController {
  constructor() {}
  async list(_: Request, res: Response) {
    try {
      // const data = await db.select("*").from("books");
      const data = await Books.list();
      res.status(200).json({
        meta: {
          message: "success",
          success: true,
          code: 200,
        },
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          message: (error as Error).message,
          success: false,
          code: 500,
        },
        data: null,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await Books.show(id);
      res.status(200).json({
        meta: {
          message: "success",
          success: true,
          code: 200,
        },
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          message: (error as Error).message,
          success: false,
          code: 500,
        },
        data: null,
      });
    }
  }

  async create(req: Request, res: Response) {
    if (!req.file || !req.file.buffer) {
      throw new Error("File buffer is undefined");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const {
      id,
      title,
      author,
      published_year,
      total_copies,
      copies_available,
      genre,
    } = req.body;

    try {
      const pictureUrl = await Media.storage.uploader.upload(file);

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      const params = {
        id,
        title,
        author,
        published_year,
        total_copies,
        copies_available,
        genre,
        picture,
      };

      const data = await Books.create(params);

      res.status(201).json({
        message: "Create Success!",
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async update(req: Request, res: Response) {
    const idUser: string = req.params.id;
    if (!req.file || !req.file.buffer) {
      throw new Error("File buffer is undefined");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const {
      id,
      title,
      author,
      published_year,
      total_copies,
      copies_available,
      genre,
    } = req.body;

    try {
      const pictureUrl = await Media.storage.uploader.upload(file);

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      const params = {
        id,
        title,
        author,
        published_year,
        total_copies,
        copies_available,
        genre,
        picture,
      };

      const data = await Books.update(idUser, params);

      res.status(201).json({
        message: "Create Success!",
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await Books.delete(id);
      res.status(200).json({
        meta: {
          message: "success",
          success: true,
          code: 200,
        },
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          message: (error as Error).message,
          success: false,
          code: 500,
        },
        data: null,
      });
    }
  }
}

export default new ControllerBooks();
