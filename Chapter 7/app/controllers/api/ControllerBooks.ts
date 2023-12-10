import { NextFunction, Request, Response } from "express";
import { IRestController } from "../../interfaces/IRest";
import ServiceBooks from "../../services/ServiceBooks";
import { IUsers } from "../../models/Users";
import { IBooks } from "../../models/Books";
import { IRequestWithAuth } from "../../middlewares/Auth";
import ResponseBuilder from "../../utils/ResponseBuilder";
import media from "../../config/media";
import { type UploadApiErrorResponse } from "cloudinary";

class ControllerBooks {
  private _serviceBooks: ServiceBooks;

  constructor(serviceBooks: ServiceBooks) {
    this._serviceBooks = serviceBooks;
  }

  upload() {
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        if (req.file) {
          const fileBase64 = req.file.buffer.toString("base64");
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          const resultUpload = await media.storage.uploader.upload(
            file,
            (err, result) => {
              if (err) {
                return ResponseBuilder.response({
                  code: 403,
                  res,
                  data: "failed upload to storage",
                });
              }
              return result;
            }
          );

          return ResponseBuilder.response({
            code: 200,
            res,
            data: resultUpload,
          });
        }

        ResponseBuilder.response({
          code: 404,
          res,
          data: "file not found",
        });
      } catch (error) {
        ResponseBuilder.response({
          code: 500,
          data: "upload failed",
          res,
        });
      }
    };
  }

  create() {
    const serviceBooks = this._serviceBooks;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceBooks.setUser = req.user as IUsers;

        const result = await serviceBooks.create(req.body as IBooks);

        return ResponseBuilder.response({
          res,
          code: 201,
          data: result,
          message: "success create a new book",
        });
      } catch (error) {
        next(error);
      }
    };
  }

  update() {
    const serviceBooks = this._serviceBooks;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        serviceBooks.setUser = req.user as IUsers;

        const result = await serviceBooks.update(id, req.body as IBooks);
        return ResponseBuilder.response({
          res,
          code: 200,
          data: result,
          message: "success update a book",
        });
      } catch (error) {
        next(error);
      }
    };
  }

  list() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query = req.query;
        const result = await this._serviceBooks.list(query);
        const totalPages =
          Math.floor(result.total / Number(query?.size ?? 10)) + 1;

        return ResponseBuilder.response({
          res,
          code: 200,
          data: result.results,
          message: "success fetch books",
          meta: {
            page: query?.page ? Number(query?.page) : 1,
            size: query?.size ? Number(query?.size) : 10,
            totalData: result.total,
            totalPages,
          },
        });
      } catch (error) {
        next(error);
      }
    };
  }

  remove() {
    const serviceBooks = this._serviceBooks;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceBooks.setUser = req.user as IUsers;
        const id = req.params?.id;
        const result = await this._serviceBooks.remove(id);

        return ResponseBuilder.response({
          res,
          code: 200,
          data: result,
          message: "success remove book",
        });
      } catch (error) {
        next(error);
      }
    };
  }

  show() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        const result = await this._serviceBooks.show(id);

        return ResponseBuilder.response({
          res,
          code: 200,
          data: result,
          message: "success get one book",
        });
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerBooks;
