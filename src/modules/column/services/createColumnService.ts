import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { CreateColumnUseCase } from '../usecases/CreateColumnUseCase';
import { CreateColumnInput } from '../repositories/IColumnRepository';

export interface CreateColumnServiceInput {
  organizationId: string;
  data: {
    title: string; boardId: string;
  };
}

export const createColumnService = async (input: CreateColumnServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const createColumnUseCase = new CreateColumnUseCase(boardRepo, columnRepo);

  return createColumnUseCase.execute(input);
};
