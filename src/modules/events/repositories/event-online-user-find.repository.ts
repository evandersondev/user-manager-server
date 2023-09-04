import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class EventOnlineUserFindRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(email: string) {
    return await this.prisma.online.findUnique({ where: { userEmail: email } })
  }
}
