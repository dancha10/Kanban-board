import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FileModelDocument = File & Document

@Schema()
export class File {
  @Prop({ type: String, require: true })
  fileName: string

  @Prop({ type: String, unique: true, require: true })
  url: string

  @Prop({ type: Number })
  size: number
}

export const FileSchema = SchemaFactory.createForClass(File)
