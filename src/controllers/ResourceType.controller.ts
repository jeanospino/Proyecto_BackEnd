import { Request, Response } from 'express';
import { ResourceType, ResourceTypeI } from '../models/ResourceType';  // Asegúrate de importar el modelo correctamente

export class ResourceTypeController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para ResourceType');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todos los tipos de recursos
    public async getAllResourceTypes(req: Request, res: Response): Promise<void> {
        try {
            const resourceTypes: ResourceTypeI[] = await ResourceType.findAll(); // select * from resourceTypes
            res.status(200).json({ resourceTypes });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener un tipo de recurso específico por ID
    public async getOneResourceType(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const resourceType: ResourceTypeI | null = await ResourceType.findOne({
                where: { id: idParam }
            });

            if (resourceType) {
                res.status(200).json(resourceType);
            } else {
                res.status(404).json({ msg: 'El tipo de recurso no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear un nuevo tipo de recurso
    public async createResourceType(req: Request, res: Response): Promise<void> {
        const { type } = req.body;

        // Validación básica
        if (!type) {
            res.status(400).json({ msg: 'El tipo de recurso es requerido' });
            return; // Añadido return para salir del método
        }

        try {
            const newResourceType: ResourceTypeI = await ResourceType.create({
                type
            });
            res.status(201).json({ newResourceType });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar un tipo de recurso existente
    public async updateResourceType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { type } = req.body;

        // Validación básica
        if (!type) {
            res.status(400).json({ msg: 'El tipo de recurso es requerido' });
            return; // Añadido return para salir del método
        }

        try {
            const resourceTypeExist: ResourceTypeI | null = await ResourceType.findByPk(pk);

            if (!resourceTypeExist) {
                res.status(404).json({ msg: 'El tipo de recurso no existe' });
                return; // Añadido return para salir del método
            }

            await ResourceType.update(
                { type },
                { where: { id: pk } }
            );

            const updatedResourceType: ResourceTypeI | null = await ResourceType.findByPk(pk);
            res.status(200).json({ updatedResourceType });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar un tipo de recurso
    public async deleteResourceType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const resourceTypeExist: ResourceTypeI | null = await ResourceType.findByPk(pk);

            if (!resourceTypeExist) {
                res.status(404).json({ msg: 'El tipo de recurso no existe' });
                return; // Añadido return para salir del método
            }

            await ResourceType.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}
