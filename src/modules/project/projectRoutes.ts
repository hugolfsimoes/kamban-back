import { Router } from 'express';
import ProjectController from './controllers/ProjectController';

const ProjectControllerRouter = Router();
const projectController = new ProjectController();

ProjectControllerRouter.post('/', (req, res, next) => projectController.create(req, res, next));
ProjectControllerRouter.get('/', (req, res, next) => projectController.list(req, res, next));
ProjectControllerRouter.get('/:id', (req, res, next) => projectController.getById(req, res, next));
ProjectControllerRouter.put('/:id', (req, res, next) => projectController.update(req, res, next));
ProjectControllerRouter.delete('/:id', (req, res, next) => projectController.delete(req, res, next));

export default ProjectControllerRouter;
