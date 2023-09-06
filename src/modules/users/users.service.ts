import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { Model } from 'mongoose'
import { UserDocument, UserEntity } from './entities/user.entity'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    const users = await this.userModel.find().select('-password').exec()

    return users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      role: user.role,
    }))
  }

  async find(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec()

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      role: user.role,
    }
  }

  async create(user: CreateUserDto) {
    const userExists = await this.userModel
      .findOne({ email: user.email })
      .exec()

    if (userExists) {
      throw new ConflictException('User already exists with the same email.')
    }

    const passwordHashed = await hash(user.password, 8)

    await this.userModel.create({
      ...user,
      password: passwordHashed,
    })
  }

  async update(id: string, user: UpdateUserDto) {
    await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: user }, { new: true })
      .exec()
  }

  async delete(id: string) {
    await this.userModel.deleteOne({ _id: id }).exec()
  }
}
