import { Request, Response } from 'express';
import { Resources, ResourcesI } from '../models/Resources';  // Asegúrate de importar el modelo correctamente

export class ResourcesController {

    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para Resources');
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener todos los recursos
    public async getAllResources(req: Request, res: Response): Promise<void> {
        try {
            const resources: ResourcesI[] = await Resources.findAll(); // select * from resources
            res.status(200).json({ resources });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Obtener un recurso específico por ID
    public async getOneResource(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const resource: ResourcesI | null = await Resources.findOne({
                where: { id: idParam }
            });

            if (resource) {
                res.status(200).json(resource);
            } else {
                res.status(404).json({ msg: 'El recurso no existe' });
            }
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Crear un nuevo recurso
    public async createResource(req: Request, res: Response): Promise<void> {
        const { title, description, resource_type_id } = req.body;

        // Validación básica
        if (!title || !description || !resource_type_id) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const newResource: ResourcesI = await Resources.create({
                title, description, resource_type_id
            });
            res.status(201).json({ newResource });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Actualizar un recurso existente
    public async updateResource(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { title, description, resource_type_id } = req.body;

        // Validación básica
        if (!title || !description || !resource_type_id) {
            res.status(400).json({ msg: 'Todos los campos son requeridos' });
            return; // Añadido return para salir del método
        }

        try {
            const resourceExist: ResourcesI | null = await Resources.findByPk(pk);

            if (!resourceExist) {
                res.status(404).json({ msg: 'El recurso no existe' });
                return; // Añadido return para salir del método
            }

            await Resources.update(
                { title, description, resource_type_id },
                { where: { id: pk } }
            );

            const updatedResource: ResourcesI | null = await Resources.findByPk(pk);
            res.status(200).json({ updatedResource });
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }

    // Eliminar un recurso
    public async deleteResource(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const resourceExist: ResourcesI | null = await Resources.findByPk(pk);

            if (!resourceExist) {
                res.status(404).json({ msg: 'El recurso no existe' });
                return; // Añadido return para salir del método
            }

            await Resources.destroy({ where: { id: pk } });

            res.status(204).send(); // Enviando una respuesta vacía
        } catch (error) {
            console.error(error); // Registrar el error
            res.status(500).json({ msg: 'Error Interno' });
        }
    }
}
