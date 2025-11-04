import { Exclude } from "class-transformer";

export interface AuthorInterface {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

export class AuthorEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;

  @Exclude()
  password: string; 
  
  constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
