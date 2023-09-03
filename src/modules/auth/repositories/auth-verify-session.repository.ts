import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class AuthVerifySessionRepository {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async handle(request: Request) {
    const [, token] = request.headers.authorization?.split(' ')

    const session = await this.prisma.session.findUnique({
      where: { token },
    })

    if (!session) {
      throw new UnauthorizedException('User not unauthorized.')
    }

    const isValid = await this.jwtService.verifyAsync(token, {
      secret: 'sercret_temporary',
    })

    return {
      isValid,
    }
  }
}
