import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { File } from './file.model'

interface ITime {
  start: number
  end: number
  isCompleted: boolean
}

export type CardModelDocument = Card & Document

@Schema()
export class Card {
  @Prop({ type: String, default: 'TODO' })
  title: string

  @Prop({ type: String, default: '' })
  description: string

  @Prop({ type: String })
  borderColor: string

  @Prop({ type: String })
  coverURL: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'File' }] })
  attachment: Array<File>

  @Prop(
    raw({
      start: { type: Number },
      end: { type: Number },
      isCompleted: { type: Boolean, default: false },
    }),
  )
  time: ITime
}

export const CardSchema = SchemaFactory.createForClass(Card)
