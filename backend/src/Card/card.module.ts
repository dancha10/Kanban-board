import { forwardRef, Module } from '@nestjs/common'
import { CardService } from './card.service'
import { CardController } from './card.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Card, CardSchema } from '../Models/card.model'
import { FileUploadModule } from '../FileUpload/file-upload.module'
import { ColumnModule } from '../Column/column.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    FileUploadModule,
    forwardRef(() => ColumnModule),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
