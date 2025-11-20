
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../modules/user/repositories/IUserRepository';
import { IOrganizationRepository } from '../../organization/repositories/IOrganizationRepository';
import { Organization } from '../entities/Organization';

export interface CreateOrganizationInput {
  name: string;

}

export class CreateOrganizationUseCase {
  constructor(
    private organizationRepository: IOrganizationRepository,
  ) {}

  async execute(data: CreateOrganizationInput): Promise<Organization> {

    const organization = await this.organizationRepository.findByName(data.name);

    if (organization) {
      throw new Error('Organization already exists');
    }

    const newOrg = await this.organizationRepository.createOrg({ name: data.name });

    return { ...newOrg };
  }
}
