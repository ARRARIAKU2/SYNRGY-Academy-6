import { Request, Response } from "express";

import ServiceCars from "../services/cars.service";
import Media from "../config/media";
import { ICars, CarController } from "../interfaces/interface";

interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type according to your decoded user type
}

class ControllerCars implements CarController {
  constructor() {}

  async getCars(req: Request, res: Response) {
    try {
      const cars = (await ServiceCars.getCars()) as ICars[];

      if (cars.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: cars,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getCar(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const car = (await ServiceCars.getCar(id)) as ICars[];

      if (car.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: car,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createCar(req: Request, res: Response) {
    if (!req.file || !req.file.buffer) {
      throw new Error("File buffer is undefined");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    try {
      const pictureUrl = await Media.storage.uploader.upload(file);

      const picture = (await pictureUrl).url;

      const params: ICars = {
        created_by: (req as AuthenticatedRequest).user.username,
        title: req.body.title,
        price: req.body.price,
        picture: picture,
        available: req.body.available,
        status: req.body.status,
        deleted_by: "",
        edited_by: "",
      };

      const car = (await ServiceCars.createCar(params)) as ICars;

      res.status(200).json({
        message: "Success Create Data!",
        data: car,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateCar(req: Request, res: Response) {
    const { id } = req.params;
    if (!req.file || !req.file.buffer) {
      throw new Error("File buffer is undefined");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    try {
      const pictureUrl = await Media.storage.uploader.upload(file);

      const picture = (await pictureUrl).url;

      const params: ICars = {
        title: req.body.title,
        price: req.body.price,
        picture: picture,
        available: req.body.available,
        edited_by: (req as AuthenticatedRequest).user.username,
        updated_at: String(new Date()),
      };

      const car = (await ServiceCars.updateCar(id, params)) as ICars;

      res.status(200).json({
        message: "Success Update Data!",
        data: car,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteCar(req: Request, res: Response) {
    const { id } = req.params;
    const params: ICars = {
      available: false,
      status: "deleted",
      deleted_by: (req as AuthenticatedRequest).user.username,
      updated_at: String(new Date()),
    };
    try {
      const car = (await ServiceCars.deleteCar(id, params).then((data) => {
        if (data) {
          res.status(200).json({
            message: "Success Delete Data!",
            data: data,
          });
        } else {
          res.status(404).json({
            message: "Data Not Found!",
          });
        }
      })) as ICars;
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new ControllerCars();
