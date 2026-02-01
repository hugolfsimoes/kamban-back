import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../auth/middleware/authMiddleware';
import { CardDTO } from '../../board/repositories/ICardRepository';
import { createCardService } from '../services/createCardService';
import { getCardByIdService } from '../services/getCardByIdService';
import { listCardsService } from '../services/listCardsService';
import { updateCardService } from '../services/updateCardService';
import { deleteCardService } from '../services/deleteCardService';
import { moveCardService } from '../services/moveCardService';

export default class CardController {
  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { columnId } = req.body;
      const { organizationId, userId } = req.user!;

      if (!columnId) {
        res.status(400).json({ error: 'Campos obrigatórios:  columnId' });
        return;
      }

      const card = await createCardService({
        organizationId,
        userId,
        data: { columnId },
      });
      res.status(201).json({ card });
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const columnId = req.query.columnId as string;
      const { organizationId } = req.user!;

      if (!columnId) {
        res.status(400).json({ error: 'Query obrigatória: columnId' });
        return;
      }

      const cards = await listCardsService({ columnId, organizationId });
      res.status(200).json({ cards });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;

      const card = await getCardByIdService({ cardId: id, organizationId });
      res.status(200).json({ card });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, columnId, position } = req.body;
      const { organizationId } = req.user!;

      if (!title && description === undefined && columnId === undefined && position === undefined) {
        res.status(400).json({ error: 'É necessário informar ao menos um campo para atualizar' });
        return;
      }

      const card = await updateCardService({
        cardId: id,
        organizationId,
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(columnId !== undefined && { columnId }),
          ...(position !== undefined && { position: Number(position) }),
        },
      });
      res.status(200).json({ card });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;

      await deleteCardService({ cardId: id, organizationId });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async move(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { columnId, position } = req.body;
      const { organizationId } = req.user!;

      if (!columnId || position === undefined) {
        res.status(400).json({ error: 'Campos obrigatórios: columnId, position' });
        return;
      }

      const card = await moveCardService({
        cardId: id,
        organizationId,
        columnId,
        position: Number(position),
      });
      res.status(200).json({ card });
    } catch (error) {
      next(error);
    }
  }
}
