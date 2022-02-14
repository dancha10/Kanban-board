import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { HydratedDocument, Model } from 'mongoose'
import { Column, ColumnModelDocument } from '../Models/column.model'
import { BoardService } from '../Board/board.service'
import { CreateColumnDto } from './DTO/CreateColumn.dto'
import { UpdateColumnDto } from './DTO/UpdateColumn.dto'
import { CardService } from '../Card/card.service'
import { IResponseMessage } from '../Types/PromiseTypes'
import { Card, CardModelDocument } from '../Models/card.model'

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private ColumnModel: Model<ColumnModelDocument>,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,
    private readonly cardService: CardService,
  ) {}

  async createNewColumn(columnDto: CreateColumnDto): Promise<IResponseMessage> {
    const column = await this.ColumnModel.create({ title: columnDto.title })
    const searchBoard = await this.boardService.findByBID(columnDto.BID)
    if (!searchBoard)
      throw new HttpException(
        'The required board does not exist',
        HttpStatus.NOT_FOUND,
      )
    const options = {
      $push: {
        columns: [column],
      },
    }

    await this.boardService.findOneAndAddColumn(columnDto.BID, options)
    return { message: 'Column created successfully' }
  }

  async changeTitle(
    columnDto: UpdateColumnDto,
    CID: string,
  ): Promise<IResponseMessage> {
    const updateColumn = await this.ColumnModel.findOneAndUpdate(
      {
        _id: CID,
      },
      { title: columnDto.title },
    )
    if (!updateColumn)
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND)
    return { message: 'Title changed' }
  }

  async removeColumn(id: string): Promise<IResponseMessage> {
    const removedColumn = await this.ColumnModel.findByIdAndDelete({ _id: id })
    if (!removedColumn)
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND)
    await this.boardService.findOneAndDeleteColumn(id)
    return { message: 'Column removed' }
  }

  // other

  async createStarterPack(): Promise<Array<Column>> {
    const FirstCard = await this.cardService.createStartCard(
      ColumnService.randomTitle(),
    )
    const SecondCard = await this.cardService.createStartCard(
      ColumnService.randomTitle(),
    )
    const ThirdCard = await this.cardService.createStartCard(
      ColumnService.randomTitle(),
    )

    const todoColumn = await this.ColumnModel.create({
      title: 'TODO',
      cards: [FirstCard, SecondCard],
    })
    const inProcessColumn = await this.ColumnModel.create({
      title: 'In Process',
      cards: [ThirdCard],
    })
    return [todoColumn, inProcessColumn]
  }

  async addCardInColumn(ColumnID: string, card: any) {
    console.log(card)
    return this.ColumnModel.findByIdAndUpdate(
      {
        _id: ColumnID,
      },
      {
        $push: {
          cards: [card],
        },
      },
    )
  }

  private static randomTitle(): string {
    const randomTitles: Array<string> = [
      'Catch Spider-man',
      'Kill Superman',
      'To do homework',
      'Find a girlfriend',
      'Go to the toilet',
    ]
    const randomNumber = Math.floor(Math.random() * randomTitles.length)
    return randomTitles[randomNumber]
  }
}
