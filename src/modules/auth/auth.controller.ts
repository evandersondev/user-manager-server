import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { z } from 'zod'

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const requestSchema = z.object({
  headers: z.object({
    authorization: z.string(),
  }),
})

type CreateSessionBodyType = z.infer<typeof createSessionSchema>
type RequestType = z.infer<typeof requestSchema>

@Controller('session')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  async createSession(@Body() body: CreateSessionBodyType) {
    const { email, password } = createSessionSchema.parse(body)

    return await this.service.createSession({ email, password })
  }

  @Get('verify')
  async verifyToken(@Request() resquest: RequestType) {
    return this.service.verifyToken(resquest)
  }
}
