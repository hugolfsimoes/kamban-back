import { Router } from 'express';
import CardController from './controllers/CardController';

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post('/', (req, res) => cardController.create(req, res));
cardRouter.get('/', (req, res) => cardController.list(req, res));
cardRouter.get('/:id', (req, res) => cardController.getById(req, res));
cardRouter.put('/:id', (req, res) => cardController.update(req, res));
cardRouter.delete('/:id', (req, res) => cardController.delete(req, res));

export default cardRouter;