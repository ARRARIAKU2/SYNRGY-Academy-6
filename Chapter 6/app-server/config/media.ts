import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

class Media {
  private _upload;
  // private _storage;
  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    cloudinary.config({
      cloud_name: "dpmmsdjxy",
      api_key: "647487294136952",
      api_secret: "QqYFTekIr0BnHj9gJ6Wn3vlD_F0",
    });
  }

  get upload() {
    return this._upload;
  }

  get storage() {
    return cloudinary;
  }
}

export default new Media();
