import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { ListColumnsUseCase } from '../usecases/ListColumnsUseCase';

export interface ListColumnsServiceInput {
  boardId: string;
  organizationId: string;
}

export const listColumnsService = async (input: ListColumnsServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const listColumnsUseCase = new ListColumnsUseCase(boardRepo, columnRepo);

  return listColumnsUseCase.execute(input);
};
