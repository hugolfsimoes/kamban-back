import { Organization } from '../entities/Organization';

export interface IOrganizationRepository {
  findByName(name: string): Promise<Organization | null>;
  createOrg(data: { name: string; }): Promise<Organization>;
}
