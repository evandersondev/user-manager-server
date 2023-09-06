import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { OnlineDocument, OnlineEntity } from './entities/online.entity'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(OnlineEntity.name)
    private onlineModel: Model<OnlineDocument>,
  ) {}

  async create(email: string) {
    const user = await this.find(email)

    if (!user) {
      return await this.onlineModel.create({ email })
    }
  }

  async delete(email: string) {
    await this.onlineModel.deleteOne({ email }).exec()
  }

  async findAll() {
    return await this.onlineModel.find().exec()
  }

  async find(email: string) {
    return await this.onlineModel.findOne({ email }).exec()
  }
}
