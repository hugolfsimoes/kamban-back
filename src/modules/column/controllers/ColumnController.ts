
import { NextFunction, Request, Response } from 'express';
import { getColumnsByBoardIdService } from '../services/getColumnsByBoardId';

export default class ColumnController {
  create(req: Request, res: Response) {

  }

  list(req: Request, res: Response) {

  }

  getById(req: Request, res: Response) {

  }

  update(req: Request, res: Response) {

  }

  delete(req: Request, res: Response) {

  }

  async getColumnsByBoardId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const columns = await getColumnsByBoardIdService(id);
      res.status(200).json({ columns });
    } catch (error) {
      next(error);
    }
  }
}
