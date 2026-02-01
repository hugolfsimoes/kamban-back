import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../../board/repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../../column/repositories/prisma/PrismaColumnRepository';
import { ListCardsUseCase } from '../usecases/ListCardsUseCase';

export interface ListCardsServiceInput {
  columnId: string;
  organizationId: string;
}

export const listCardsService = async (input: ListCardsServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const cardRepo = new PrismaCardRepository(prisma);
  const listCardsUseCase = new ListCardsUseCase(boardRepo, columnRepo, cardRepo);

  return listCardsUseCase.execute(input);
};
