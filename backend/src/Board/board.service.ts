import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { nanoid } from 'nanoid'
import { Board, BoardModelDocument } from '../Models/board.model'
import { ColumnService } from '../Column/column.service'
import { CreateBoardDto } from './DTO/CreateBoard.dto'
import { SetColorDto } from './DTO/SetColor.dto'
import { IPayload, IResponseMessage } from '../Utils/Types/promise.type'

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private BoardModel: Model<BoardModelDocument>,
    @Inject(forwardRef(() => ColumnService))
    private readonly columnService: ColumnService,
  ) {}

  async getAllMainInfoBoards(userInfo: any) {
    const boards = await this.BoardModel.find({
      users: { $in: userInfo._id },
    }).select('BID title background')
    if (!boards)
      throw new HttpException('Boards not found', HttpStatus.NOT_FOUND)
    return boards
  }

  async getBoardById(id: string): Promise<Board> {
    const board = await this.BoardModel.findOne({ BID: id })
      .populate({
        path: 'columns',
        populate: {
          path: 'cards',
          populate: {
            path: 'attachment',
            model: 'File',
          },
        },
      })
      .populate('users', 'avatarURL nickname')
    if (!board)
      throw new HttpException('This board not found', HttpStatus.NOT_FOUND)
    return board
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    userInfo: any,
  ): Promise<IResponseMessage> {
    const BID: string = nanoid(8)
    const columns = await this.columnService.createStarterPack()
    await this.BoardModel.create({
      BID,
      title: createBoardDto.title,
      owner: [userInfo._id],
      users: [userInfo._id],
      columns: columns,
    })

    return { message: 'Board created' }
  }

  async updateBoard(
    id: string,
    updateBoardDto: CreateBoardDto,
    userInfo: any,
  ): Promise<IResponseMessage> {
    const Board = await this.findByBID(id)
    if (Board.owner != userInfo._id)
      throw new HttpException(
        'You are not the creator of the board',
        HttpStatus.BAD_REQUEST,
      )
    await this.BoardModel.findOneAndUpdate(
      { BID: id },
      { title: updateBoardDto.title },
    )
    return { message: 'Board update' }
  }

  async setColor(
    id: string,
    colorDto: SetColorDto,
    userInfo: any,
  ): Promise<Board> {
    const Board = await this.BoardModel.findOne({ BID: id })
    if (Board.owner != userInfo._id)
      throw new HttpException(
        'You are not the creator of the board',
        HttpStatus.BAD_REQUEST,
      )
    return this.BoardModel.findOneAndUpdate(
      { BID: id },
      { background: colorDto.background },
    )
  }

  async removeBoard(id: string): Promise<IResponseMessage> {
    const supposedBoard = await this.BoardModel.findOneAndDelete({ BID: id })
    console.log(supposedBoard)
    if (!supposedBoard)
      throw new HttpException('This board does not exist', HttpStatus.NOT_FOUND)
    return { message: 'Board remove' }
  }

  // other

  async findByBID(id: string): Promise<Board> {
    return this.BoardModel.findOne({ BID: id })
  }

  async findOneAndAddColumn(BID: string, options: any): Promise<Board> {
    return this.BoardModel.findOneAndUpdate({ BID }, options)
  }

  async findOneAndDeleteColumn(columnID: string): Promise<Board> {
    return this.BoardModel.findOneAndUpdate(
      { columns: { $elemMatch: { $in: columnID } } },
      {
        $pull: { columns: columnID },
      },
    )
  }
}
