import { Router } from 'express';
import BoardController from './controllers/BoardController';

const boardRouter = Router();
const boardController = new BoardController();

boardRouter.post('/', (req, res, next) => boardController.create(req, res, next));
boardRouter.get('/', (req, res, next) => boardController.list(req, res, next));
boardRouter.get('/:id', (req, res, next) => boardController.getById(req, res, next));
boardRouter.put('/:id', (req, res, next) => boardController.update(req, res, next));
boardRouter.delete('/:id', (req, res, next) => boardController.delete(req, res, next));

export default boardRouter;
