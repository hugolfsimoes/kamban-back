import { Router } from 'express';
import CardController from './controllers/CardController';

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post('/', (req, res, next) => cardController.create(req, res, next));
cardRouter.get('/', (req, res, next) => cardController.list(req, res, next));
cardRouter.get('/:id', (req, res, next) => cardController.getById(req, res, next));
cardRouter.put('/:id/move', (req, res, next) => cardController.move(req, res, next));
cardRouter.put('/:id', (req, res, next) => cardController.update(req, res, next));
cardRouter.delete('/:id', (req, res, next) => cardController.delete(req, res, next));

export default cardRouter;