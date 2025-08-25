
export interface ProjectDTO {
  id: string;
  name: string;
}

export interface IProjectRepository {
  findManyByOrganization(organizationId: string): Promise<ProjectDTO[]>;
}
