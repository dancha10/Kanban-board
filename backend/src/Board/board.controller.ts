import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { BoardService } from './board.service'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/Auth/Guard/jwt-auth.guard'
import { CreateBoardDto } from './DTO/CreateBoard.dto'
import { SetColorDto } from './DTO/SetColor.dto'
import { Board } from '../Models/board.model'
import { IResponseMessage } from '../Utils/Types/promise.type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllBoards(@Req() request: Request) {
    return this.boardService.getAllMainInfoBoards(request.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardService.getBoardById(id)
  }

  @ApiOperation({ summary: 'Create new board' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() request: Request,
  ): Promise<IResponseMessage> {
    return this.boardService.createBoard(createBoardDto, request.user)
  }

  @ApiOperation({ summary: 'Change board' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/change/:id')
  changeBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: CreateBoardDto,
    @Req() request: Request,
  ): Promise<IResponseMessage> {
    return this.boardService.updateBoard(id, updateBoardDto, request.user)
  }

  @ApiOperation({ summary: 'Set background color' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/color/:id')
  changeColor(
    @Param('id') id: string,
    @Body() colorDto: SetColorDto,
    @Req() request: Request,
  ): Promise<Board> {
    return this.boardService.setColor(id, colorDto, request.user)
  }

  @ApiOperation({ summary: 'Delete board' })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  removeBoard(@Param('id') id: string): Promise<IResponseMessage> {
    return this.boardService.removeBoard(id)
  }
}
