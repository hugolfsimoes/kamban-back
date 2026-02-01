import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../../board/repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../../column/repositories/prisma/PrismaColumnRepository';
import { DeleteCardUseCase } from '../usecases/DeleteCardUseCase';

export interface DeleteCardServiceInput {
  cardId: string;
  organizationId: string;
}

export const deleteCardService = async (input: DeleteCardServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const cardRepo = new PrismaCardRepository(prisma);
  const deleteCardUseCase = new DeleteCardUseCase(boardRepo, columnRepo, cardRepo);

  return deleteCardUseCase.execute(input);
};
