import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Column, ColumnSchema } from '../Models/column.model'
import { ColumnController } from './column.controller'
import { ColumnService } from './column.service'
import { BoardModule } from '../Board/board.module'
import { CardModule } from '../Card/card.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
    forwardRef(() => BoardModule),
    forwardRef(() => CardModule),
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class ColumnModule {}
