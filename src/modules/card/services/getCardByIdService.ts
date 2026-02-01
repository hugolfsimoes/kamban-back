import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../../board/repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../../column/repositories/prisma/PrismaColumnRepository';
import { GetCardByIdUseCase } from '../usecases/GetCardByIdUseCase';

export interface GetCardByIdServiceInput {
  cardId: string;
  organizationId: string;
}

export const getCardByIdService = async (input: GetCardByIdServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const cardRepo = new PrismaCardRepository(prisma);
  const getCardByIdUseCase = new GetCardByIdUseCase(boardRepo, columnRepo, cardRepo);

  return getCardByIdUseCase.execute(input);
};
