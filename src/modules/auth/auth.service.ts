import { Injectable } from '@nestjs/common'
import { AuthCreateSessionRepository } from './repositories/auth-create-session.repository'

interface CreateSessionBodyType {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(private createSessionRepository: AuthCreateSessionRepository) {}

  async createSession({ email, password }: CreateSessionBodyType) {
    return await this.createSessionRepository.handle(email, password)
  }
}
