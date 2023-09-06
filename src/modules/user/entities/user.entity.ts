import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = UserEntity & Document

type UserProps = {
  name: string
  email: string
  password: string
  photoUrl: string
  role: 'owner' | 'admin' | 'employee'
}

@Schema({ collection: 'users' })
export class UserEntity {
  constructor(props: UserProps) {
    Object.assign(this, props)
  }

  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: false })
  photoUrl: string

  @Prop({ enum: ['owner', 'admin', 'employee'], default: 'employee' })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
