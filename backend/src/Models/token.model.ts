import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { User } from './user.model'

export type TokenModelDocument = Token & Document

@Schema()
export class Token {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: String })
  refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)
