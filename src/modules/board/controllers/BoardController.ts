import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../auth/middleware/authMiddleware';
import { BoardListItemDTO } from '../repositories/IBoardRepository';
import { BoardWithColumnsDTO } from '../usecases/getBoardByIdServiceUseCase';
import { listBoardsService } from '../services/listBoards';
import { createBoardService } from '../services/createBoardService';
import { getInfoBoardByIdService } from '../services/getBoardByIdService';
import { updateBoardService } from '../services/updateBoardService';
import { deleteBoardService } from '../services/deleteBoardService';

export default class BoardController {
  async list(
    req: AuthRequest,
    res: Response<{ boards: BoardListItemDTO[]; }>,
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

  async getInfoBoardByBoardId(
    req: Request,
    res: Response<{ board: BoardWithColumnsDTO | null; }>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const board = await getInfoBoardByIdService(id as string);
      res.status(200).json({ board });
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

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, color } = req.body;
      const { organizationId } = req.user!;

      if (!name && !color) {
        res.status(400).json({ error: 'É necessário informar name ou color para atualizar' });
        return;
      }

      const board = await updateBoardService({
        boardId: id as string,
        organizationId,
        data: { ...(name !== undefined && { name }), ...(color !== undefined && { color }) },
      });

      res.status(200).json({ board });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;

      await deleteBoardService({ boardId: id as string, organizationId });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
