import { Request, Response } from 'express';
import User from '../model/user';

export const getUsers = async (req: Request, res: Response) => {
    const data = await req.body;
    console.log(data);
    const usuarios = await User.all();

    res.json({
        msg: 'getUsers',
        usuarios
    });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;



    res.json({
        msg: 'getUser',
        id
    });
}

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;

    res.json({
        msg: 'postUser',
        body
    });
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'putUser',
        id,
        body
    });
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'deleteUser',
        id
    });
}

