import { Request, Response } from 'express';
import { ReturnRecord, ReturnRecordI } from '../models/ReturnRecord';  // Asegúrate de importar el modelo correctamente

export class ReturnRecordController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para ReturnRecord');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todos los registros de devolución
    public async getAllReturnRecords(req: Request, res: Response): Promise<void> {
        try {
            const returnRecords: ReturnRecordI[] = await ReturnRecord.findAll(); // select * from returnRecords
            res.status(200).json({ returnRecords });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener un registro de devolución específico por ID
    public async getOneReturnRecord(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const returnRecord: ReturnRecordI | null = await ReturnRecord.findOne({
                where: { id: idParam }
            });

            if (returnRecord) {
                res.status(200).json(returnRecord);
            } else {
                res.status(404).json({ msg: 'El registro de devolución no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear un nuevo registro de devolución
    public async createReturnRecord(req: Request, res: Response): Promise<void> {
        const { loan_id, librarian_id, return_date } = req.body;

        // Validación básica
        if (!loan_id || !librarian_id || !return_date) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const newReturnRecord: ReturnRecordI = await ReturnRecord.create({
                loan_id,
                librarian_id,
                return_date,
                
            });
            res.status(201).json({ newReturnRecord });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar un registro de devolución existente
    public async updateReturnRecord(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { loan_id, librarian_id, return_date } = req.body;

        // Validación básica
        if (!loan_id || !librarian_id || !return_date ) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const returnRecordExist: ReturnRecordI | null = await ReturnRecord.findByPk(pk);

            if (!returnRecordExist) {
                res.status(404).json({ msg: 'El registro de devolución no existe' });
                return; // Añadido return para salir del método
            }

            await ReturnRecord.update(
                { loan_id, librarian_id, return_date},
                { where: { id: pk } }
            );

            const updatedReturnRecord: ReturnRecordI | null = await ReturnRecord.findByPk(pk);
            res.status(200).json({ updatedReturnRecord });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar un registro de devolución
    public async deleteReturnRecord(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const returnRecordExist: ReturnRecordI | null = await ReturnRecord.findByPk(pk);

            if (!returnRecordExist) {
                res.status(404).json({ msg: 'El registro de devolución no existe' });
                return; // Añadido return para salir del método
            }

            await ReturnRecord.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}
