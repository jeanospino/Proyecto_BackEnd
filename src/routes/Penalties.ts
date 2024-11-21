import { Request, Response, Application, Router } from "express";
import { PenaltiesController } from '../controllers/Penalties.controller';

export class PenaltiesRoutes {
    public penaltiesController: PenaltiesController = new PenaltiesController();

    public routes(app: Application): void {
        app.route("/penalties/test").get(this.penaltiesController.test);
        app.route("/penalties").get(this.penaltiesController.getAllPenalties);
        app.route("/penalties/:id").get(this.penaltiesController.getOnePenalty);
        app.route("/penalties").post(this.penaltiesController.createPenalty);
        app.route("/penalties/:id").put(this.penaltiesController.updatePenalty);
        app.route("/penalties/:id").delete(this.penaltiesController.deletePenalty);
    }
}
