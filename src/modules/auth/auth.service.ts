import { Injectable } from '@nestjs/common'
import { AuthCreateSessionRepository } from './repositories/auth-create-session.repository'
import { AuthVerifySessionRepository } from './repositories/auth-verify-session.repository'
import { Request } from 'express'

interface CreateSessionBodyType {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(
    private createSessionRepository: AuthCreateSessionRepository,
    private verifyTokenSessionRepository: AuthVerifySessionRepository,
  ) {}

  async createSession({ email, password }: CreateSessionBodyType) {
    return await this.createSessionRepository.handle(email, password)
  }

  async verifyToken(request: Request) {
    return await this.verifyTokenSessionRepository.handle(request)
  }
}
