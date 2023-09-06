import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SessionDocument = SessionEntity & Document

type SessionProps = {
  email: string
  token: string
}

@Schema({ collection: 'sessions' })
export class SessionEntity {
  constructor(props: SessionProps) {
    Object.assign(this, props)
  }

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, unique: true })
  token: string
}

export const SessionSchema = SchemaFactory.createForClass(SessionEntity)
