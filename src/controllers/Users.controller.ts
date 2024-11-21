import { Request, Response } from 'express';
import { Users, UsersI } from '../models/Users';

export class UserController {

    // Test method
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for User');
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    // Get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: UsersI[] = await Users.findAll();
            res.status(200).json({ users });
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    // Get a specific user by ID
    public async getOneUser(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const user: UsersI | null = await Users.findOne({
                where: { id: idParam }
            });

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ msg: 'User not found' });
            }
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    // Create a new user
    public async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, address, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ msg: 'All fields are required' });
            return;
        }

        try {
            const newUser: UsersI = await Users.create({ name, email, address, password });
            res.status(201).json({ newUser });
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    // Update an existing user
    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { name, email, address, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ msg: 'All fields are required' });
            return;
        }

        try {
            const userExist: UsersI | null = await Users.findByPk(pk);

            if (!userExist) {
                res.status(404).json({ msg: 'User not found' });
                return;
            }

            await Users.update({ name, email, address, password }, { where: { id: pk } });
            const updatedUser: UsersI | null = await Users.findByPk(pk);
            res.status(200).json({ updatedUser });
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }

    // Delete a user
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const userExist: UsersI | null = await Users.findByPk(pk);

            if (!userExist) {
                res.status(404).json({ msg: 'User not found' });
                return;
            }

            await Users.destroy({ where: { id: pk } });
            res.status(204).send();
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
}
