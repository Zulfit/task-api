import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register(authDto: AuthDto) {
    const existingUser = await this.usersService.findByEmail(authDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    const createdUser = await this.usersService.create(authDto.email, hashedPassword);
    const { password, ...user } = createdUser;
    return { message: 'Registered successfully!', user };
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByEmail(authDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compare(authDto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Logged in successfully!', access_token: await this.jwtService.signAsync({ sub: user.id, email: user.email }) };
  }
}
