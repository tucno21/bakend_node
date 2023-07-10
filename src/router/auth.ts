import { Router } from 'express';
import { createUser, getUser } from '../controllers/authController';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';


const router = Router();

//CRUD de usuarios

router.post('/login', [
    /* middlewares */
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], getUser);
router.post('/register', [
    /* middlewares */
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('phone', 'El teléfono es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not(),
    validarCampos
], createUser);

export default router;