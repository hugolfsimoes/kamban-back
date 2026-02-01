import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../../board/repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../../column/repositories/prisma/PrismaColumnRepository';
import { UpdateCardUseCase } from '../usecases/UpdateCardUseCase';

export interface UpdateCardServiceInput {
  cardId: string;
  organizationId: string;
  data: {
    title?: string;
    description?: string | null;
    columnId?: string;
    position?: number;
  };
}

export const updateCardService = async (input: UpdateCardServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const cardRepo = new PrismaCardRepository(prisma);
  const updateCardUseCase = new UpdateCardUseCase(boardRepo, columnRepo, cardRepo);

  return updateCardUseCase.execute(input);
};
