import { Router } from 'express';
import OrganizationController from './controllers/OrganizationController';

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.post('/', (req, res) => organizationController.create(req, res));
organizationRouter.get('/', (req, res) => organizationController.list(req, res));
organizationRouter.get('/:id', (req, res) => organizationController.getById(req, res));
organizationRouter.put('/:id', (req, res) => organizationController.update(req, res));
organizationRouter.delete('/:id', (req, res) => organizationController.delete(req, res));

export default organizationRouter;
