import { forwardRef, Module } from '@nestjs/common'
import { BoardController } from './board.controller'
import { BoardService } from './board.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Board, BoardSchema } from '../Models/board.model'
import { ColumnModule } from '../Column/column.module'
import { BoardGateway } from './board.gateway'
import { AuthModule } from '../Auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    forwardRef(() => ColumnModule),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardGateway],
  exports: [BoardService],
})
export class BoardModule {}
