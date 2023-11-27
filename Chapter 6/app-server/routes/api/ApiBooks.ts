import { Router } from "express";
import ControllerBooks from "../../controllers/api/ControllerBooks";
import CheckAuthorization from "../../middlewares/checkAuth";
import Media from "../../config/media";

class ApiBooks {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    // REST dan CRUD
    this.router.get("/", ControllerBooks.list);
    this.router.get("/:id", ControllerBooks.show);
    this.router.post(
      "/",
      Media.upload.single("picture"),
      ControllerBooks.create
    );
    this.router.put(
      "/:id",
      Media.upload.single("picture"),
      ControllerBooks.update
    );
    this.router.delete("/:id", ControllerBooks.delete);

    return this.router;
  }
}

export default new ApiBooks();
