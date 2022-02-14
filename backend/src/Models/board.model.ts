import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from './user.model'
import { Column } from './column.model'

export type BoardModelDocument = Board & Document

@Schema()
export class Board {
  @Prop({ type: String, unique: true })
  BID: string

  @Prop({ type: String, default: 'New board' })
  title: string

  @Prop({ type: String, default: 'blue' })
  background: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Array<User>

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Column' }] })
  columns: Array<Column>
}

export const BoardSchema = SchemaFactory.createForClass(Board)
