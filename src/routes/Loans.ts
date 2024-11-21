import { Request, Response, Application, Router } from "express";
import { LoansController } from '../controllers/Loans.controller';

export class LoansRoutes {
    public loansController: LoansController = new LoansController();

    public routes(app: Application): void {
        app.route("/loans/test").get(this.loansController.test);
        app.route("/loans").get(this.loansController.getAllLoans);
        app.route("/loans/:id").get(this.loansController.getOneLoan);
        app.route("/loans").post(this.loansController.createLoan);
        app.route("/loans/:id").put(this.loansController.updateLoan);
        app.route("/loans/:id").delete(this.loansController.deleteLoan);
    }
}
