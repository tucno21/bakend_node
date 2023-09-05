import { Request, Response } from 'express';
import Etiqueta from '../model/etiqueta';

export const getEtiquetas = async (_: Request, res: Response) => {
    try {

        const Etiquetas = await Etiqueta.all();
        return res.json(Etiquetas);

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}

export const getEtiqueta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const etiqueta = await Etiqueta.find(id);
        if (!etiqueta) return res.status(404).json({ msg: 'No existe el Etiqueta' })
        return res.json(etiqueta);

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}

export const createEtiqueta = async (req: Request, res: Response) => {
    try {
        const { nombre, } = req.body;
        const etiqueta = await Etiqueta.create({ nombre });
        return res.json(etiqueta);

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}

export const updateEtiqueta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const etiqueta = await Etiqueta.update(id, { nombre });
        return res.json(etiqueta);

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}

export const deleteEtiqueta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const etiqueta = await Etiqueta.delete(id);
        if (!etiqueta) return res.status(404).json({ msg: 'No existe el Etiqueta' })
        return res.json({ msg: 'Etiqueta eliminado correctamente' });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}