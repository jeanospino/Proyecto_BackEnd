import { Request, Response, Application, Router } from "express";
import { UserTypeController } from '../controllers/UserType.controller';

export class UserTypeRoutes {
    public userTypeController: UserTypeController = new UserTypeController();

    public routes(app: Application): void {
        app.route("/usertypes/test").get(this.userTypeController.test);
        app.route("/usertypes").get(this.userTypeController.getAllUserType);
        app.route("/usertypes/:id").get(this.userTypeController.getOneUserType);
        app.route("/usertypes").post(this.userTypeController.createUserType);
        app.route("/usertypes/:id").put(this.userTypeController.updateUserType);
        app.route("/usertypes/:id").delete(this.userTypeController.deleteUserType);
    }
}
