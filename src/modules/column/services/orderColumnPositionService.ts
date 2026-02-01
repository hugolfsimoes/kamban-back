import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { OrderColumnPositionUseCase } from '../usecases/OrderColumnPositionUseCase';

export interface OrderColumnPositionServiceInput {
  boardId: string;
  organizationId: string;
  sourcePosition: number;
  destinationPosition: number;
}

export const orderColumnPositionService = async (input: OrderColumnPositionServiceInput) => {
  return prisma.$transaction(async (tx) => {
    const boardRepo = new PrismaBoardRepository(tx);
    const columnRepo = new PrismaColumnRepository(tx);
    const orderColumnPositionUseCase = new OrderColumnPositionUseCase(boardRepo, columnRepo);

    return orderColumnPositionUseCase.execute(input);
  });
};
