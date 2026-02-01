import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../../board/repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../../column/repositories/prisma/PrismaColumnRepository';
import { MoveCardUseCase } from '../usecases/MoveCardUseCase';

export interface MoveCardServiceInput {
  cardId: string;
  organizationId: string;
  columnId: string;
  position: number;
}

export const moveCardService = async (input: MoveCardServiceInput) => {
  return prisma.$transaction(async (tx) => {
    const boardRepo = new PrismaBoardRepository(tx);
    const columnRepo = new PrismaColumnRepository(tx);
    const cardRepo = new PrismaCardRepository(tx);
    const moveCardUseCase = new MoveCardUseCase(boardRepo, columnRepo, cardRepo);

    return moveCardUseCase.execute(input);
  });
};
