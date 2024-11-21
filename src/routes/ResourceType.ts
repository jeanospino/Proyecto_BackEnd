import { Request, Response, Application, Router } from "express";
import { ResourceTypeController } from '../controllers/ResourceType.controller';

export class ResourceTypeRoutes {
    public resourceTypeController: ResourceTypeController = new ResourceTypeController();

    public routes(app: Application): void {
        app.route("/resourcetypes/test").get(this.resourceTypeController.test);
        app.route("/resourcetypes").get(this.resourceTypeController.getAllResourceTypes);
        app.route("/resourcetypes/:id").get(this.resourceTypeController.getOneResourceType);
        app.route("/resourcetypes").post(this.resourceTypeController.createResourceType);
        app.route("/resourcetypes/:id").put(this.resourceTypeController.updateResourceType);
        app.route("/resourcetypes/:id").delete(this.resourceTypeController.deleteResourceType);
    }
}
