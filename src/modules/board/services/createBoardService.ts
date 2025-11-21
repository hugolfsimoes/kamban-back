
import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../repositories/prisma/PrismaBoardRepository';
import { CreateBoardUseCase } from '../usecases/CreateBoardUseCase';
import { CreateBoardInput } from '../repositories/IBoardRepository';

export const createBoardService = async (input: CreateBoardInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const createBoardUseCase = new CreateBoardUseCase(boardRepo);

  return createBoardUseCase.execute(input);
};
