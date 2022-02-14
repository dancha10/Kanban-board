import { Logger, UseGuards } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { BoardService } from './board.service'
import { JwtWsGuard } from './Guard/Jwt-ws.guard'
import { Board } from '../Models/board.model'

@WebSocketGateway(228)
export class BoardGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('BoardGateway')

  constructor(private readonly boardService: BoardService) {}

  @WebSocketServer()
  server: Server

  afterInit(): void {
    this.logger.log('Init...')
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  /*@UseGuards(JwtWsGuard)
  @SubscribeMessage('getAllBoards')
  async getAllBoards(data: any) {
    const boards = await this.boardService.getAllMainInfoBoards(data.user)
    return { event: 'getAllBoards', data: boards }
  }*/

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('getBoardById')
  async getBoardById(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<Board>> {
    client.join(id)
    const board = await this.boardService.getBoardById(id)
    return { event: 'getBoardById', data: board }
  }
}
