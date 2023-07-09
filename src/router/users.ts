import { Router } from 'express';
// import { getUsers } from '../controllers/userController';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController';


const router = Router();

//CRUD de usuarios
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;