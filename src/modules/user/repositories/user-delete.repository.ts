import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class UserDeleteRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    })
  }
}
