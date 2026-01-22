
import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../repositories/prisma/PrismaBoardRepository';
import { PrismaCardRepository } from '../repositories/prisma/PrismaCardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { GetInfoBoardByIdUseCase } from '../usecases/getBoardByIdServiceUseCase';

export const getInfoBoardByIdService = async (boardId: string) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const cardRepo = new PrismaCardRepository(prisma);
  const getInfoBoardByIdServiceUseCase = new GetInfoBoardByIdUseCase(boardRepo, columnRepo, cardRepo);

  return getInfoBoardByIdServiceUseCase.execute({ boardId });
};
