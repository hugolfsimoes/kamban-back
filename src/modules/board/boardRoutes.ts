import { Router } from 'express';
import BoardController from './controllers/BoardController';

const boardRouter = Router();
const boardController = new BoardController();

boardRouter.post('/', (req, res) => boardController.create(req, res));
boardRouter.get('/', (req, res) => boardController.list(req, res));
boardRouter.get('/:id', (req, res) => boardController.getById(req, res));
boardRouter.put('/:id', (req, res) => boardController.update(req, res));
boardRouter.delete('/:id', (req, res) => boardController.delete(req, res));

export default boardRouter;
