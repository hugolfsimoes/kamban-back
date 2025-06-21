
import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../repositories/prisma/PrismaBoardRepository';
import { ListBoardsUseCase } from '../usecases/ListBoardsUseCase';

export const listBoardsService = async (organizationId: string) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const listBoardsUseCase = new ListBoardsUseCase(boardRepo);

  return listBoardsUseCase.execute({ organizationId });
};
