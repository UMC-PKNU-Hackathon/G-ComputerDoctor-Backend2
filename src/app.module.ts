import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';
import { ProblemController } from './problem.controller';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AppController, UserController, ProblemController],
})
export class AppModule {}
