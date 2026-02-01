import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../../board/repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../../column/repositories/prisma/PrismaColumnRepository';
import { CreateCardUseCase } from '../usecases/CreateCardUseCase';

export interface CreateCardServiceInput {
  organizationId: string;
  userId: string;
  data: {
    columnId: string;
  };
}

export const createCardService = async (input: CreateCardServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const cardRepo = new PrismaCardRepository(prisma);
  const createCardUseCase = new CreateCardUseCase(boardRepo, columnRepo, cardRepo);

  return createCardUseCase.execute(input);
};
