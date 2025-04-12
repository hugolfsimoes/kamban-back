import { Router } from 'express';
import ColumnController from './controllers/ColumnController';

const columnRouter = Router();
const columnController = new ColumnController();

columnRouter.post('/', (req, res) => columnController.create(req, res));
columnRouter.get('/', (req, res) => columnController.list(req, res));
columnRouter.get('/:id', (req, res) => columnController.getById(req, res));
columnRouter.put('/:id', (req, res) => columnController.update(req, res));
columnRouter.delete('/:id', (req, res) => columnController.delete(req, res));

export default columnRouter;
