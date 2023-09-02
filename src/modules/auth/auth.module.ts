import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCreateSessionRepository } from './repositories/auth-create-session.repository'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthVerifySessionRepository } from './repositories/auth-verify-session.repository'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sercret_temporary',
      signOptions: { expiresIn: '1 day' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthCreateSessionRepository,
    AuthVerifySessionRepository,
  ],
})
export class AuthModule {}
