import { prisma } from '../../../infrastructure/prisma';
import { PrismaBoardRepository } from '../../board/repositories/prisma/PrismaBoardRepository';
import { PrismaColumnRepository } from '../repositories/prisma/PrismaColumnRepository';
import { GetColumnByIdUseCase } from '../usecases/GetColumnByIdUseCase';

export interface GetColumnByIdServiceInput {
  columnId: string;
  organizationId: string;
}

export const getColumnByIdService = async (input: GetColumnByIdServiceInput) => {
  const boardRepo = new PrismaBoardRepository(prisma);
  const columnRepo = new PrismaColumnRepository(prisma);
  const getColumnByIdUseCase = new GetColumnByIdUseCase(boardRepo, columnRepo);

  return getColumnByIdUseCase.execute(input);
};
