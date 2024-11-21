import { Request, Response, Application, Router } from "express";
import { ReturnRecordController } from '../controllers/ReturnRecord.controller';

export class ReturnRecordRoutes {
    public returnRecordController: ReturnRecordController = new ReturnRecordController();

    public routes(app: Application): void {
        app.route("/returnrecords/test").get(this.returnRecordController.test);
        app.route("/returnrecords").get(this.returnRecordController.getAllReturnRecords);
        app.route("/returnrecords/:id").get(this.returnRecordController.getOneReturnRecord);
        app.route("/returnrecords").post(this.returnRecordController.createReturnRecord);
        app.route("/returnrecords/:id").put(this.returnRecordController.updateReturnRecord);
        app.route("/returnrecords/:id").delete(this.returnRecordController.deleteReturnRecord);
    }
}
