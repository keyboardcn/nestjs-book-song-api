import { Injectable } from '@nestjs/common';
import { InvalidCredentialException } from 'src/exceptions/forbiddend.exception';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signIn(email: string, password: string): Promise<null | User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user?.password))) {
      throw new InvalidCredentialException();
    }
    return user?.get({ plain: true });
  }
}
