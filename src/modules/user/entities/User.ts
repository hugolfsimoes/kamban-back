import { UserRole } from "../../../generated/prisma";



export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  organizationId: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public organizationId: string;
  public role: UserRole;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: IUserProps) {
    this.id = props.id || '';
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.organizationId = props.organizationId;
    this.role = props.role || 'COLLABORATOR';
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }


}
