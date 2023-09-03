import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class EventOnlineUserRemoveRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(email: string) {
    return await this.prisma.online.delete({ where: { userEmail: email } })
  }
}
