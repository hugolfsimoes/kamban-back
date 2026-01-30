import { Router } from 'express';
import ColumnController from './controllers/ColumnController';

const columnRouter = Router();
const columnController = new ColumnController();

columnRouter.post('/', (req, res, next) => columnController.create(req, res, next));
columnRouter.put('/order', (req, res, next) => columnController.orderPosition(req, res, next));
columnRouter.get('/', (req, res, next) => columnController.list(req, res, next));
columnRouter.get('/:id', (req, res, next) => columnController.getById(req, res, next));
columnRouter.put('/:id', (req, res, next) => columnController.update(req, res, next));
columnRouter.delete('/:id', (req, res, next) => columnController.delete(req, res, next));

export default columnRouter;
