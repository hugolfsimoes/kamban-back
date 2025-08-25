
import { prisma } from '../../../infrastructure/prisma';
import { PrismaProjectRepository } from '../repositories/prisma/PrismaProjectRepository';
import { ListProjectsUseCase } from '../usecases/ListProjectsUseCase';

export const listBoardsService = async (organizationId: string) => {
  const projectRepository = new PrismaProjectRepository(prisma);
  const listProjectsUseCase = new ListProjectsUseCase(projectRepository);

  return listProjectsUseCase.execute({ organizationId });
};
