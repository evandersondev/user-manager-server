import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class UserUpdateRepository {
  constructor(private prisma: PrismaService) {}

  async hanlde(id: string, input: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data: { photoUrl: input.photoUrl, role: input.role },
    })
  }
}
