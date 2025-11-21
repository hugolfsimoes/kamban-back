// src/modules/board/controllers/BoardController.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../auth/middleware/authMiddleware';
import { listBoardsService } from '../services/listBoards';
import { createBoardService } from '../services/createBoardService';

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

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      res.json({ message: `Board with id ${id}` });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, color } = req.body;
      
      
      const { organizationId } = req.user!;

      if (!name || !color) {
        res.status(400).json({ error: 'Missing required fields: name, color' });
        return;
      }

      const board = await createBoardService({
        name,
        color,
        organizationId,
      });

      res.status(201).json({ board });
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
