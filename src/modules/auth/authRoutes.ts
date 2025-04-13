import { Router } from 'express';
import AuthController from './controllers/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post('/signup', (req, res, next) => authController.signup(req, res, next));
authRouter.post('/login', (req, res, next) => authController.signin(req, res, next));

export default authRouter;
