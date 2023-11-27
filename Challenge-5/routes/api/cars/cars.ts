import express, { Request, Response } from "express";

import storage from "../../../storage";
import upload from "../../../upload";
// import db from '../../../config/database'; // Koneksi Databse Langsung
// import db from "../../../db/knex/knex"; // Koneksi Database Menggunakan Knex
import db from "../../../db/sequelize/models/cars"; // Koneksi Database Menggunakan Sequelize

// /api/books
const router = express.Router(); // instance dari function Router

// Render
router.get("/cars", (req: Request, res: Response) => {
  res.render("cars", {
    title: "Cars",
  });
});

// List
router.get("/", async (req: Request, res: Response) => {
  try {
    // const data = await db.select("*").from("cars"); // Koneksi Knex
    const data = await db.findAll(); // Koneksi Sequelize

    if (data.length === 0) {
      console.log("Data Not Found");
      res.status(404).send({
        message: "Data Not Found",
        data: data,
      });
    } else {
      res.status(200).json({
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
});

// Single
router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // const data = await db.select("*").from("cars").where("car_id", "=", id); // Koneksi Knex
    const data = await db.findByPk(id); // Koneksi Sequelize

    if (data === null) {
      console.log("Data Not Found");
      res.status(404).send({
        message: "Data Not Found",
        data: data,
      });
    } else {
      console.log(data);
      res.status(200).json({
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
});

// Create
router.post(
  "/",
  upload.single("picture"),
  async (req: Request, res: Response) => {
    if (!req.file || !req.file.buffer) {
      throw new Error("File buffer is undefined");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const { title, price, created_at, updated_at } = req.body;

    try {
      const pictureUrl = await storage.uploader.upload(file);

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      // Koneksi Knex
      // const data = await db("cars").insert({
      //   title: title,
      //   price: price,
      //   picture: picture,
      //   created_at: created_at,
      //   updated_at: updated_at,
      // });

      // Koneksi Sequelize
      const data = await db.create({
        title: title,
        price: price,
        picture: picture,
        created_at: created_at,
        updated_at: updated_at,
      });

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
);

// Update
router.put(
  "/:id",
  upload.single("picture"),
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!req.file || !req.file.buffer) {
      throw new Error("File buffer is undefined");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const { title, price, created_at, updated_at } = req.body;
    try {
      const pictureUrl = await storage.uploader.upload(file);

      console.log((await pictureUrl).url);

      const picture = (await pictureUrl).url;

      // Koneksi Knex
      // const data = await db("cars").where("car_id", "=", id).update({
      //   title: title,
      //   price: price,
      //   picture: picture,
      //   created_at: created_at,
      //   updated_at: updated_at,
      // });

      // Koneksi Sequelize
      const data = await db.update(
        {
          title: title,
          price: price,
          picture: picture,
          created_at: created_at,
          updated_at: updated_at,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(201).json({
        message: "Update Success!",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
);

// Delete
router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // const data = await db("cars").where("car_id", "=", id).del(); // Koneksi Knex
    const data = await db.destroy({ where: { id: id } }).then((num) => {
      if (num === 1) {
        res.status(201).send({
          message: "Data was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Data with id = ${id}. Maybe Data was not found!`,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
});

export default router;
