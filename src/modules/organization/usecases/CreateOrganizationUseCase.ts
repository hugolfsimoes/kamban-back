
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../modules/user/repositories/IUserRepository';
import { IOrganizationRepository } from '../../organization/repositories/IOrganizationRepository';
import { UserRole } from '@prisma/client';
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
