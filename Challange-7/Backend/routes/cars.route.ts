import { Router } from "express";

import ControllerCars from "../controllers/cars.controller";
import Auth from "../middlewares/Auth";
import Media from "../config/media";

class ApiCars {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", Auth.AuthSuperAndAdmin, ControllerCars.getCars);
    this.router.get("/:id", Auth.AuthSuperAndAdmin, ControllerCars.getCar);
    this.router.post("/", Auth.AuthSuperAndAdmin, ControllerCars.createCar);
    this.router.put("/:id", Auth.AuthSuperAndAdmin, ControllerCars.updateCar);
    this.router.delete(
      "/:id",
      Auth.AuthSuperAndAdmin,
      ControllerCars.deleteCar
    );
    this.router.post(
      "/upload",
      Media.upload.single("picture"),
      Auth.AuthSuperAndAdmin,
      ControllerCars.upload
    );

    return this.router;
  }
}

export default new ApiCars();
