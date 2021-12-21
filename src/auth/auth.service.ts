import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/auth/constants';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(jwtConstants.secret);
    const user = await this.usersService.findOne(email);
    if (user) {
      const checkPass = bcrypt.compare(pass, user.passwordHash);
      if (user && checkPass) {
        const { _id, email, firstName } = user;
        return this.jwtService.sign({ id: _id, email, firstName });
      }
    }
    return null;
  }
}
