
import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../repositories/prisma/PrismaBoardRepository';
import { GetBoardByIdServiceUseCase } from '../usecases/getBoardByIdServiceUseCase';

export const getBoardByIdService = async (boardId: string) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const getBoardByIdServiceUseCase = new GetBoardByIdServiceUseCase(boardRepo);

  return getBoardByIdServiceUseCase.execute({ boardId });
};
