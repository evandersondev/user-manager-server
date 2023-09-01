import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { z } from 'zod'

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
}
