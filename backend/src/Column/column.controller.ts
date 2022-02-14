import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from '../Auth/Guard/jwt-auth.guard'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './DTO/CreateColumn.dto'
import { UpdateColumnDto } from './DTO/UpdateColumn.dto'
import { IResponseMessage } from '../Types/PromiseTypes'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Column')
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: 'Create new column' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createNewColumn(
    @Body() columnDto: CreateColumnDto,
  ): Promise<IResponseMessage> {
    return this.columnService.createNewColumn(columnDto)
  }

  @ApiOperation({ summary: 'Change title column' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/change/:id')
  changeColumn(
    @Param('id') id: string,
    @Body() columnDto: UpdateColumnDto,
  ): Promise<IResponseMessage> {
    return this.columnService.changeTitle(columnDto, id)
  }

  @ApiOperation({ summary: 'Delete column' })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  removeColumn(@Param('id') id: string): Promise<IResponseMessage> {
    return this.columnService.removeColumn(id)
  }
}
