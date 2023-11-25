import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { ProblemRequest } from './dto/problem-request';

@Controller('/problems')
export class ProblemController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('/')
  getProblem() {
    return this.prisma.problem.findMany();
  }

  @Post('/')
  createProblem(@Req() req: Request, @Body() dto: ProblemRequest) {
    if (!req.headers.authorization) {
      throw new Error('No authorization header');
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'secret',
      });

      const imageUrls = [
        'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg',
        'https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg',
        'https://i.ytimg.com/vi/NpTSHIXA2Og/maxresdefault.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhznXMUfEFnoHcgqZBq7QYOea6xN3i2KTTyA&usqp=CAU',
        'https://i.ytimg.com/vi/gjVX47dLlN8/hqdefault.jpg',
        'https://marvel-b1-cdn.bc0a.com/f00000000290162/images.ctfassets.net/2htm8llflwdx/1LEJIT9KGRC4nwTJ5vuS6H/a912e31c468fd32986f2818816135cc4/OnlineLearning_SouthAsia_Learning_Indoor_GettyImages-1071652068.jpg?fit=thumb',
        'https://cdn.educba.com/academy/wp-content/uploads/2023/08/Components-of-Computers-Image.jpg',
      ];

      // 랜덤 이미지 선택
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const randomImageUrl = imageUrls[randomIndex];

      return this.prisma.problem.create({
        data: { ...dto, userId: decoded.userId, iamge: randomImageUrl },
      });
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
