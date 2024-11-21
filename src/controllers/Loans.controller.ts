import { Request, Response } from 'express';
import { Loans, LoansI } from '../models/Loans';  // Asegúrate de importar el modelo correctamente

export class LoansController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para Loans');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todos los préstamos
    public async getAllLoans(req: Request, res: Response): Promise<void> {
        try {
            const loans: LoansI[] = await Loans.findAll(); // select * from loans
            res.status(200).json({ loans });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener un préstamo específico por ID
    public async getOneLoan(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const loan: LoansI | null = await Loans.findOne({
                where: { id: idParam }
            });

            if (loan) {
                res.status(200).json(loan);
            } else {
                res.status(404).json({ msg: 'El préstamo no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear un nuevo préstamo
    public async createLoan(req: Request, res: Response): Promise<void> {
        const { resource_id, user_id, librarian_id, loan_date, return_date, status } = req.body;

        // Validación básica
        if (!resource_id || !user_id || !librarian_id || !loan_date || !return_date || !status) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const newLoan: LoansI = await Loans.create({
                resource_id, user_id, librarian_id, loan_date, return_date, status
            });
            res.status(201).json({ newLoan });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar un préstamo existente
    public async updateLoan(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { resource_id, user_id, librarian_id, loan_date, return_date, status } = req.body;

        // Validación básica
        if (!resource_id || !user_id || !librarian_id || !loan_date || !return_date || !status) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const loanExist: LoansI | null = await Loans.findByPk(pk);

            if (!loanExist) {
                res.status(404).json({ msg: 'El préstamo no existe' });
                return; // Añadido return para salir del método
            }

            await Loans.update(
                { resource_id, user_id, librarian_id, loan_date, return_date, status },
                { where: { id: pk } }
            );

            const updatedLoan: LoansI | null = await Loans.findByPk(pk);
            res.status(200).json({ updatedLoan });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar un préstamo
    public async deleteLoan(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const loanExist: LoansI | null = await Loans.findByPk(pk);

            if (!loanExist) {
                res.status(404).json({ msg: 'El préstamo no existe' });
                return; // Añadido return para salir del método
            }

            await Loans.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}
