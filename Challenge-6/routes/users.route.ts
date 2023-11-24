import { Router } from "express";

import ControllerUsers from "../controllers/users.controller";
import Auth from "../middlewares/Auth";

class ApiUsers {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", Auth.Auth, ControllerUsers.getUsers);
    this.router.get("/:id", Auth.Auth, ControllerUsers.getUser);
    this.router.put("/:id", Auth.Auth, ControllerUsers.updateUser);
    this.router.delete("/:id", Auth.Auth, ControllerUsers.deleteUser);

    return this.router;
  }
}

export default new ApiUsers();
