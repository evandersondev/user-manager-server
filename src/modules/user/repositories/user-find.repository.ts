import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class UserFindRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
