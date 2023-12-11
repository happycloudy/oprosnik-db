import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findByUsername(username);
    const hashedPassword = await this.usersService.hashPassword(pass);
    if (user?.password !== hashedPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      id: user._id,
      role: user.role,
    };
  }

  async register(dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
