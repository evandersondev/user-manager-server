import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class EventOnlineUserRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(email: string) {
    return await this.prisma.online.create({ data: { userEmail: email } })
  }
}
