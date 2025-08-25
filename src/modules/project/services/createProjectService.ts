
import { prisma } from '../../../infrastructure/prisma';
import { PrismaProjectRepository } from '../repositories/prisma/PrismaProjectRepository';
import { CreateBoardUseCase } from '../usecases/CreateProjectUseCase';

export const createBoardService = async (organizationId: string, name: string) => {
  const boardRepo = new PrismaProjectRepository(prisma);
  const listProjectsUseCase = new CreateBoardUseCase(boardRepo);

  return listProjectsUseCase.execute({ organizationId, name });
};
