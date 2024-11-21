import { Request, Response, Application, Router } from "express";
import { ResourcesController } from '../controllers/Resources.controller';

export class ResourcesRoutes {
    public resourcesController: ResourcesController = new ResourcesController();

    public routes(app: Application): void {
        app.route("/resources/test").get(this.resourcesController.test);
        app.route("/resources").get(this.resourcesController.getAllResources);
        app.route("/resources/:id").get(this.resourcesController.getOneResource);
        app.route("/resources").post(this.resourcesController.createResource);
        app.route("/resources/:id").put(this.resourcesController.updateResource);
        app.route("/resources/:id").delete(this.resourcesController.deleteResource);
    }
}
