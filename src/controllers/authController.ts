import { Request, Response } from 'express';
import User from '../model/user';
import { generateJWT } from '../helpers/jwt';
const bcrypt = require('bcryptjs');

export const getUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //verificar si el email existe
        const usuario = await User.veryfyEmail(email);

        //si no existe
        if (usuario === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            });
        }

        // verificar password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        //generar el token
        const token = await generateJWT({ uid: usuario.id, email: usuario.email });

        //elimanar el password del objeto
        usuario.password = undefined;

        return res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { body } = req;

        //buscar si el email existe
        const comprobar = await User.where('email', body.email).first();

        //si existe
        if (comprobar) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            });
        }

        //encriptar password
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(body.password, salt);

        //guardar usuario
        const usuario = await User.create(body);

        //generar el token
        const token = await generateJWT({ uid: usuario.id, email: usuario.email });

        return res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error: any) {
        return res.status(500).json({
            msg: 'Error en el servidor',
            error: error.message
        });
    }
}