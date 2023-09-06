import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OnlineDocument = OnlineEntity & Document

type OnlineProps = {
  name: string
  email: string
}

@Schema({ collection: 'onlines' })
export class OnlineEntity {
  constructor(props: OnlineProps) {
    Object.assign(this, props)
  }

  @Prop({ required: true, unique: true })
  email: string
}

export const OnlineSchema = SchemaFactory.createForClass(OnlineEntity)
