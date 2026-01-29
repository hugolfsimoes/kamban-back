import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { UpdateColumnUseCase } from '../usecases/UpdateColumnUseCase';
import { UpdateColumnInput } from '../repositories/IColumnRepository';

export interface UpdateColumnServiceInput {
  columnId: string;
  organizationId: string;
  data: UpdateColumnInput;
}

export const updateColumnService = async (input: UpdateColumnServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const updateColumnUseCase = new UpdateColumnUseCase(boardRepo, columnRepo);

  return updateColumnUseCase.execute(input);
};
