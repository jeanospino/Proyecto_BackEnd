import { Request, Response } from 'express';
import { Penalties, PenaltiesI } from '../models/Penalties';  // Asegúrate de importar el modelo correctamente

export class PenaltiesController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para Penalties');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todas las penalizaciones
    public async getAllPenalties(req: Request, res: Response): Promise<void> {
        try {
            const penalties: PenaltiesI[] = await Penalties.findAll(); // select * from penalties
            res.status(200).json({ penalties });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener una penalización específica por ID
    public async getOnePenalty(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const penalty: PenaltiesI | null = await Penalties.findOne({
                where: { id: idParam }
            });

            if (penalty) {
                res.status(200).json(penalty);
            } else {
                res.status(404).json({ msg: 'La penalización no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear una nueva penalización
    public async createPenalty(req: Request, res: Response): Promise<void> {
        const { return_id, user_id, amount, reason, penalty_date } = req.body;

        // Validación básica
        if (!return_id || !user_id || !amount || !reason || !penalty_date) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const newPenalty: PenaltiesI = await Penalties.create({
                return_id, user_id, amount, reason, penalty_date
            });
            res.status(201).json({ newPenalty });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar una penalización existente
    public async updatePenalty(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { return_id, user_id, amount, reason, penalty_date } = req.body;

        // Validación básica
        if (!return_id || !user_id || !amount || !reason || !penalty_date) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const penaltyExist: PenaltiesI | null = await Penalties.findByPk(pk);

            if (!penaltyExist) {
                res.status(404).json({ msg: 'La penalización no existe' });
                return; // Añadido return para salir del método
            }

            await Penalties.update(
                { return_id, user_id, amount, reason, penalty_date },
                { where: { id: pk } }
            );

            const updatedPenalty: PenaltiesI | null = await Penalties.findByPk(pk);
            res.status(200).json({ updatedPenalty });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar una penalización
    public async deletePenalty(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const penaltyExist: PenaltiesI | null = await Penalties.findByPk(pk);

            if (!penaltyExist) {
                res.status(404).json({ msg: 'La penalización no existe' });
                return; // Añadido return para salir del método
            }

            await Penalties.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}
