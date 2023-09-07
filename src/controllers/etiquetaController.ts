import { Request, Response } from 'express';
import Etiqueta from '../model/etiqueta';

export const getEtiquetas = async (_req: Request, res: Response) => {
    try {

        const etiquetas = await Etiqueta.all();
        return res.json({
            status: 'success',
            message: 'Lista de etiquetas',
            data: etiquetas
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const getEtiqueta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const etiqueta = await Etiqueta.find(id);
        if (!etiqueta) return res.status(404).json({ status: 'error', message: 'No existe el Etiqueta' })
        return res.json({
            status: 'success',
            message: 'Etiqueta',
            data: etiqueta
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const createEtiqueta = async (req: Request, res: Response) => {
    try {
        const { nombre, } = req.body;
        const etiqueta = await Etiqueta.create({ nombre });
        return res.json({
            status: 'success',
            message: 'Etiqueta creado correctamente',
            data: etiqueta
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateEtiqueta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const etiqueta = await Etiqueta.update(id, { nombre });
        return res.json({
            status: 'success',
            message: 'Etiqueta actualizado correctamente',
            data: etiqueta
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const deleteEtiqueta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const etiqueta = await Etiqueta.delete(id);
        if (!etiqueta) return res.status(404).json({ status: 'error', message: 'No existe el Etiqueta' })
        return res.json({ status: 'success', message: 'Etiqueta eliminado correctamente' });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}