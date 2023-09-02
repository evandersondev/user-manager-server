import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthVerifySessionRepository {
  constructor(private jwtService: JwtService) {}

  async handle(request: Request) {
    const [, token] = request.headers.authorization?.split(' ')

    const isValid = await this.jwtService.verifyAsync(token, {
      secret: 'sercret_temporary',
    })

    return {
      isValid,
    }
  }
}
