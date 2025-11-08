import { Injectable } from '@nestjs/common';
import { InvalidCredentialException } from 'src/exceptions/forbiddend.exception';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signIn(email: string, password: string): Promise<null | User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || user?.password !== password) {
      throw new InvalidCredentialException();
    }
    return user?.get({ plain: true });
  }
}
