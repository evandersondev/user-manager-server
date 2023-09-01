import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class UserFindAllRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde() {
    return this.prisma.user.findMany()
  }
}
