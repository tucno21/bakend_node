import { Request, Response } from 'express';
import Blog from '../model/blog';
import blogEtiquetas from '../model/blogEtiquetas';

export const getBlogs = async (_req: Request, res: Response) => {
    try {
        const blogs = await Blog.all()
        return res.json({
            status: 'success',
            message: 'Blogs encontrados',
            data: blogs
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const getBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const blog = await Blog.find(id);

        const etiquetas = await blogEtiquetas.select('etiquetas.id', 'etiquetas.nombre')
            .join('etiquetas', 'blogs_etiquetas.etiqueta_id', '=', 'etiquetas.id')
            .where('blogs_etiquetas.blog_id', '=', id)
            .get();

        //agregamos las etiquetas al blog
        blog.etiquetas = etiquetas;

        if (!blog) return res.status(404).json({
            status: 'error',
            message: 'No existe el blog'
        });

        return res.json({
            status: 'success',
            message: 'Blog encontrado',
            data: blog
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const createBlog = async (req: Request, res: Response) => {
    try {

        const { titulo, contenido, usuario_id, etiquetas } = req.body;
        const blog = await Blog.create({ titulo, contenido, usuario_id });

        console.log(etiquetas);

        //relacionamos el blog con las etiquetas
        etiquetas.forEach(async (etiqueta: string) => {
            await blogEtiquetas.create({ blog_id: blog.id, etiqueta_id: etiqueta });
        })

        //obtenemos las etiquetas almacenadas en blogEtiquetas
        const tags = await blogEtiquetas.select('etiquetas.id', 'etiquetas.nombre')
            .join('etiquetas', 'blogs_etiquetas.etiqueta_id', '=', 'etiquetas.id')
            .where('blogs_etiquetas.blog_id', '=', blog.id)
            .get();

        //agregamos las etiquetas al blog
        blog.etiquetas = tags;

        return res.json({
            status: 'success',
            message: 'Blog creado',
            data: blog
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, contenido, usuario_id, etiquetas } = req.body;

        // Paso 1: Actualiza el blog en la tabla "blogs"
        const blog = await Blog.update(id, { titulo, contenido, usuario_id });

        // Paso 2: Actualiza las etiquetas asociadas al blog en la tabla "blogs_etiquetas"
        // Primero, obtén las etiquetas actuales para este blog
        const etiquetasActuales = await blogEtiquetas.where('blog_id', '=', id).get();
        // Luego, elimina cada etiqueta actual
        for (const etiquetaActual of etiquetasActuales) {
            await blogEtiquetas.delete(etiquetaActual.id);
        }

        // Paso 3: Agrega las nuevas etiquetas
        if (etiquetas && etiquetas.length > 0) {
            for (const etiquetaId of etiquetas) {
                await blogEtiquetas.create({ etiqueta_id: etiquetaId, blog_id: id });
            }
        }

        //btenemos las etiquetas almacenadas en blogEtiquetas
        const tags = await blogEtiquetas.select('etiquetas.id', 'etiquetas.nombre')
            .join('etiquetas', 'blogs_etiquetas.etiqueta_id', '=', 'etiquetas.id')
            .where('blogs_etiquetas.blog_id', '=', blog.id)
            .get();

        //agregamos las etiquetas al blog
        blog.etiquetas = tags;

        return res.json({
            status: 'success',
            message: 'Blog actualizado',
            data: blog
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const blog = await Blog.delete(id);
        if (!blog) return res.status(404).json({
            status: 'error',
            message: 'No existe el blog'
        })

        return res.json({
            status: 'success',
            message: 'Blog eliminado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}