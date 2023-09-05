import { Request, Response } from 'express';
import User from '../model/user';
import { generateJWT } from '../helpers/jwt';
import fileSave from '../helpers/fileSave';
import fileDelete from '../helpers/fileDelete';
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
    // try {
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

    const images = req.files;
    const result = fileSave({ file: images!, fieldName: ['imagen'] });

    if ('error' in result) return res.status(400).json(result);

    const { imagen } = result.nameFiles;
    //agregar imagen a body
    body.imagen = imagen;

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

    // } catch (error: any) {
    //     return res.status(500).json({
    //         msg: 'Error en el servidor',
    //         error: error.message
    //     });
    // }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { body } = req;

        const usuario = await User.where('id', id).first();

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        if (req.files) {
            const result = fileSave({ file: req.files!, fieldName: ['imagen'] });
            if ('error' in result) return res.status(400).json(result);
            const { imagen } = result.nameFiles;

            // eliminar la imagen anterior
            fileDelete(usuario.imagen);

            //agregar imagen a body
            body.imagen = imagen;
        }

        if (body.password) {
            //encriptar password
            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);
        }

        //guardar usuario
        const usuarioActualizado = await User.update(usuario.id, body);

        return res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}