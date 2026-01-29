import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { DeleteColumnUseCase } from '../usecases/DeleteColumnUseCase';

export interface DeleteColumnServiceInput {
  columnId: string;
  organizationId: string;
}

export const deleteColumnService = async (
  input: DeleteColumnServiceInput
): Promise<void> => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const deleteColumnUseCase = new DeleteColumnUseCase(boardRepo, columnRepo);

  await deleteColumnUseCase.execute(input);
};
