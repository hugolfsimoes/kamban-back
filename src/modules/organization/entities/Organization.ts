import { v4 as uuidv4 } from 'uuid';

export interface IOrganizationProps {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Organization {
  public readonly id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: IOrganizationProps) {
    this.id = props.id || uuidv4();
    this.name = props.name;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

}
