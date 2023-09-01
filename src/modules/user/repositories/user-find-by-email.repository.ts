import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class UserFindByEmailRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
