import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class EventOnlineUsersAllRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde() {
    return await this.prisma.online.findMany()
  }
}
