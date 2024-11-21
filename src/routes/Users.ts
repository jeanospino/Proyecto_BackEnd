import { Request, Response, Application, Router } from "express";
import { UserController } from '../controllers/Users.controller';

export class UserRoutes {
    public userController: UserController = new UserController();

    public routes(app: Application): void {
        app.route("/users/test").get(this.userController.test);
        app.route("/users").get(this.userController.getAllUsers);
        app.route("/users/:id").get(this.userController.getOneUser);
        app.route("/users").post(this.userController.createUser);
        app.route("/users/:id").put(this.userController.updateUser);
        app.route("/users/:id").delete(this.userController.deleteUser);
    }
}
