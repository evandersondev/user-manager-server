import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { z } from 'zod'
import { AuthGuard } from '../auth/auth.guard'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  photoUrl: z.string().url().optional(),
  role: z.enum(['employee', 'admin', 'owner']),
})

const updateUserBodySchema = z.object({
  id: z.string(),
  photoUrl: z.string().nullable(),
  role: z.enum(['employee', 'admin', 'owner']),
})

const deleteUserBodySchema = z.object({
  id: z.string(),
})

type CreateUserBodyType = z.infer<typeof createUserBodySchema>
type UpdateUserBodyType = z.infer<typeof updateUserBodySchema>
type DeleteUserBodyType = z.infer<typeof deleteUserBodySchema>

@Controller('/users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.service.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async find(@Param() params: { id: string }) {
    const { id } = params
    return await this.service.find(id)
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserBodyType) {
    const { name, email, password, photoUrl, role } =
      createUserBodySchema.parse(body)

    await this.service.create({ name, email, password, photoUrl, role })
  }

  @Put()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async update(@Body() body: UpdateUserBodyType) {
    const { id, photoUrl, role } = body

    await this.service.update({ id, photoUrl, role })
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(@Param() params: DeleteUserBodyType) {
    const { id } = params

    await this.service.delete(id)
  }
}
