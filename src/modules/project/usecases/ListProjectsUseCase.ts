import { IProjectRepository } from '../repositories/IProjectRepository';

interface ListProjectsInput {
  organizationId: string;
}

interface ProjectDTO {
  id: string;
  name: string;
}

export class ListProjectsUseCase {
  constructor(private projectsRepository: IProjectRepository) {}

  async execute({ organizationId }: ListProjectsInput): Promise<ProjectDTO[]> {
    return this.projectsRepository.findManyByOrganization(organizationId);
  }
}
