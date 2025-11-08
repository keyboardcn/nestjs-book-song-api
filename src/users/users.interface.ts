import { Exclude } from 'class-transformer';

export interface UserInterface {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  roles: string;
}

export class UserEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roles: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
