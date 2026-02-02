import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../auth/middleware/authMiddleware';
import { ColumnDTO } from '../repositories/IColumnRepository';
import { createColumnService } from '../services/createColumnService';
import { updateColumnService } from '../services/updateColumnService';
import { deleteColumnService } from '../services/deleteColumnService';
import { listColumnsService } from '../services/listColumnsService';
import { getColumnByIdService } from '../services/getColumnByIdService';
import { orderColumnPositionService } from '../services/orderColumnPositionService';

export default class ColumnController {
  async list(req: AuthRequest, res: Response<{ columns: ColumnDTO[]; }>, next: NextFunction): Promise<void> {
    try {
      const boardId = req.query.boardId as string;
      const { organizationId } = req.user!;

      const columns = await listColumnsService({ boardId, organizationId });
      res.status(200).json({ columns });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response<{ column: ColumnDTO; }>, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;

      const column = await getColumnByIdService({ columnId: id as string, organizationId });
      res.status(200).json({ column });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, boardId } = req.body;
      const { organizationId } = req.user!;

      if (!title || !boardId) {
        res.status(400).json({ error: 'Campos obrigatórios: title, boardId, position' });
        return;
      }

      const column = await createColumnService({
        organizationId,
        data: { title, boardId },
      });
      res.status(201).json({ column });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { title, position } = req.body;
      const { organizationId } = req.user!;

      if (!title && position === undefined) {
        res.status(400).json({ error: 'É necessário informar title ou position para atualizar' });
        return;
      }

      const column = await updateColumnService({
        columnId: id as string,
        organizationId,
        data: {
          ...(title !== undefined && { title }),
          ...(position !== undefined && { position: Number(position) }),
        },
      });
      res.status(200).json({ column });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;

      await deleteColumnService({ columnId: id as string, organizationId });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async orderPosition(req: AuthRequest, res: Response<{ columns: ColumnDTO[]; } | { error: string; }>, next: NextFunction): Promise<void> {
    try {
      const { boardId, sourcePosition, destinationPosition } = req.body;
      const { organizationId } = req.user!;

      if (boardId === undefined || sourcePosition === undefined || destinationPosition === undefined) {
        res.status(400).json({ error: 'Campos obrigatórios: boardId, sourcePosition, destinationPosition' });
        return;
      }

      const columns = await orderColumnPositionService({
        boardId,
        organizationId,
        sourcePosition: Number(sourcePosition),
        destinationPosition: Number(destinationPosition),
      });
      res.status(200).json({ columns });
    } catch (error) {
      next(error);
    }
  }
}
