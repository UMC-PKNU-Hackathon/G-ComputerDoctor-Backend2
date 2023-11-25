import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupRequest } from './dto/signup-request';
import { SigninRequest } from './dto/signin-request';
import { Request } from 'express';

@Controller('/users')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/')
  getHello() {
    return 'Hello World!';
  }

  @Post('/signup')
  async signUp(@Body() dto: SignupRequest) {
    const exUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (exUser) {
      throw new Error('User already exists!');
    }

    await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
      },
    });

    return 'User created!';
  }

  @Post('/login')
  async signin(@Body() dto: SigninRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    if (user.password !== dto.password) {
      throw new Error('Password mismatch!');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: 'secret',
        expiresIn: '24h',
      },
    );

    return token;
  }

  @Get('/me')
  async me(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Token not found!');
    }

    const payload = this.jwtService.verify(token, {
      secret: 'secret',
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
