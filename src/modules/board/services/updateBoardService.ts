import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../repositories/prisma/PrismaBoardRepository';
import { UpdateBoardUseCase } from '../usecases/UpdateBoardUseCase';
import { UpdateBoardInput } from '../repositories/IBoardRepository';

export interface UpdateBoardServiceInput {
  boardId: string;
  organizationId: string;
  data: UpdateBoardInput;
}

export const updateBoardService = async (input: UpdateBoardServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const updateBoardUseCase = new UpdateBoardUseCase(boardRepo);

  return updateBoardUseCase.execute(input);
};
