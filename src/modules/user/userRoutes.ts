import { Router } from 'express';
import UserController from './controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req, res) => userController.create(req, res));
userRouter.get('/', (req, res) => userController.list(req, res));
userRouter.get('/:id', (req, res) => userController.getById(req, res));
userRouter.put('/:id', (req, res) => userController.update(req, res));
userRouter.delete('/:id', (req, res) => userController.delete(req, res));

export default userRouter;
