import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../repositories/prisma/PrismaBoardRepository';
import { DeleteBoardUseCase } from '../usecases/DeleteBoardUseCase';

export interface DeleteBoardServiceInput {
  boardId: string;
  organizationId: string;
}

export const deleteBoardService = async (input: DeleteBoardServiceInput): Promise<void> => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const deleteBoardUseCase = new DeleteBoardUseCase(boardRepo);

  await deleteBoardUseCase.execute(input);
};
