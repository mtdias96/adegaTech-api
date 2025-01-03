import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data: createDto });
  }

  findFirst(email: string, name: string) {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ email }, { adega: { name } }],
      },
    });
  }
}
