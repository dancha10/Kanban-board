import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserModelDocument = User & Document

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  UID: string

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string

  @Prop({ type: String })
  password: string

  @Prop({ type: String })
  nickname: string

  @Prop({ type: String })
  avatarURL: string
}

export const UserSchema = SchemaFactory.createForClass(User)
