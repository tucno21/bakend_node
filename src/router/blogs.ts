import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blogController';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

/* middlewares */
const fields = {
    titulo: check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    contenido: check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    usuario_id: check('usuario_id', 'El usuario es obligatorio').not().isEmpty(),
}

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', [fields.titulo, fields.contenido, validarCampos], createBlog);
router.put('/:id', [fields.titulo, fields.contenido, validarCampos], updateBlog);
router.delete('/:id', deleteBlog);


export default router;