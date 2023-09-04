import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { z } from 'zod'
import { Request as RequestExpress } from 'express'

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type CreateSessionBodyType = z.infer<typeof createSessionSchema>

@Controller('session')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  async createSession(@Body() body: CreateSessionBodyType) {
    const { email, password } = createSessionSchema.parse(body)

    return this.service.createSession({ email, password })
  }

  @Get('verify')
  async verifyToken(@Request() resquest: RequestExpress) {
    return this.service.verifyToken(resquest)
  }
}
