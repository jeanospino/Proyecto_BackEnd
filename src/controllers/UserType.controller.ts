import { Request, Response } from 'express';
import { UserType, UserTypeI } from '../models/UserType';

export class UserTypeController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para UserType');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todos los tipos de usuario
    public async getAllUserType(req: Request, res: Response): Promise<void> {
        try {
            const userTypes: UserTypeI[] = await UserType.findAll(); // select * from userTypes
            res.status(200).json({ userTypes });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener un tipo de usuario específico por ID
    public async getOneUserType(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const userType: UserTypeI | null = await UserType.findOne({
                where: { id: idParam }
            });

            if (userType) {
                res.status(200).json(userType);
            } else {
                res.status(404).json({ msg: 'El tipo de usuario no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear un nuevo tipo de usuario
    public async createUserType(req: Request, res: Response): Promise<void> {
        const { userType } = req.body;

        // Validación básica
        if (!userType) {
            res.status(400).json({ msg: 'El tipo de usuario es requerido' });
            return; // Añadido return para salir del método
        }

        try {
            const newUserType: UserTypeI = await UserType.create({ userType });
            res.status(201).json({ newUserType });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar un tipo de usuario existente
    public async updateUserType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { userType } = req.body;

        // Validación básica
        if (!userType) {
            res.status(400).json({ msg: 'El tipo de usuario es requerido' });
            return; // Añadido return para salir del método
        }

        try {
            const userTypeExist: UserTypeI | null = await UserType.findByPk(pk);

            if (!userTypeExist) {
                res.status(404).json({ msg: 'El tipo de usuario no existe' });
                return; // Añadido return para salir del método
            }

            await UserType.update(
                { userType },
                { where: { id: pk } }
            );

            const updatedUserType: UserTypeI | null = await UserType.findByPk(pk);
            res.status(200).json({ updatedUserType });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar un tipo de usuario
    public async deleteUserType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const userTypeExist: UserTypeI | null = await UserType.findByPk(pk);

            if (!userTypeExist) {
                res.status(404).json({ msg: 'El tipo de usuario no existe' });
                return; // Añadido return para salir del método
            }

            await UserType.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}