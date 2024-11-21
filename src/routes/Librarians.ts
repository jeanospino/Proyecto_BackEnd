import { Request, Response, Application, Router } from "express";
import { LibrariansController } from '../controllers/Librarians.controller';

export class LibrarianRoutes {
    public librarianController: LibrariansController = new LibrariansController();

    public routes(app: Application): void {
        app.route("/librarians/test").get(this.librarianController.test);
        app.route("/librarians").get(this.librarianController.getAllLibrarians);
        app.route("/librarians/:id").get(this.librarianController.getOneLibrarian);
        app.route("/librarians").post(this.librarianController.createLibrarian);
        app.route("/librarians/:id").put(this.librarianController.updateLibrarian);
        app.route("/librarians/:id").delete(this.librarianController.deleteLibrarian);
    }
}
