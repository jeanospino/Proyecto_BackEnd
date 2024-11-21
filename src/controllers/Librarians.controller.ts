import { Request, Response } from 'express';
import { Librarians, LibrariansI } from '../models/Librarians';  // Asegúrate de importar el modelo correctamente

export class LibrariansController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para Librarians');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todos los bibliotecarios
    public async getAllLibrarians(req: Request, res: Response): Promise<void> {
        try {
            const librarians: LibrariansI[] = await Librarians.findAll(); // select * from librarians
            res.status(200).json({ librarians });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener un bibliotecario específico por ID
    public async getOneLibrarian(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const librarian: LibrariansI | null = await Librarians.findOne({
                where: { id: idParam }
            });

            if (librarian) {
                res.status(200).json(librarian);
            } else {
                res.status(404).json({ msg: 'El bibliotecario no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear un nuevo bibliotecario
    public async createLibrarian(req: Request, res: Response): Promise<void> {
        const { first_name, last_name, email, password } = req.body;

        // Validación básica
        if (!first_name || !last_name || !email || !password) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const newLibrarian: LibrariansI = await Librarians.create({ first_name, last_name, email, password });
            res.status(201).json({ newLibrarian });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar un bibliotecario existente
    public async updateLibrarian(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { first_name, last_name, email, password } = req.body;

        // Validación básica
        if (!first_name || !last_name || !email || !password) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const librarianExist: LibrariansI | null = await Librarians.findByPk(pk);

            if (!librarianExist) {
                res.status(404).json({ msg: 'El bibliotecario no existe' });
                return; // Añadido return para salir del método
            }

            await Librarians.update(
                { first_name, last_name, email, password },
                { where: { id: pk } }
            );

            const updatedLibrarian: LibrariansI | null = await Librarians.findByPk(pk);
            res.status(200).json({ updatedLibrarian });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar un bibliotecario
    public async deleteLibrarian(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const librarianExist: LibrariansI | null = await Librarians.findByPk(pk);

            if (!librarianExist) {
                res.status(404).json({ msg: 'El bibliotecario no existe' });
                return; // Añadido return para salir del método
            }

            await Librarians.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}
