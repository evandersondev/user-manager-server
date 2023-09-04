import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class UserCreateRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(input: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: input })
  }
}
