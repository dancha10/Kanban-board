import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { Card } from './card.model'

export type ColumnModelDocument = Column & Document

@Schema()
export class Column {
  @Prop({ type: String })
  title: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  cards: Card
}

export const ColumnSchema = SchemaFactory.createForClass(Column)
