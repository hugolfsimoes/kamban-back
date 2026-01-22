import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../auth/middleware/authMiddleware';
import { listBoardsService } from '../services/listProjects';


export default class BoardController {
  async list(
    req: AuthRequest,
    res: Response<{ boards: { name: string; id: string; }[]; }>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { organizationId } = req.user!;
      const boards = await listBoardsService(organizationId);

      res.status(200).json({ boards });
    } catch (error) {
      next(error);
    }
  }

  async getInfoBoardByBoardId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      res.json({ message: `Board with id ${id}` });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(201).json({ message: 'Board created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      res.json({ message: `Board ${id} updated` });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      res.json({ message: `Board ${id} deleted` });
    } catch (error) {
      next(error);
    }
  };
}
