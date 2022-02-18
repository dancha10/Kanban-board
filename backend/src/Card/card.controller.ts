import {
  Body,
  Controller,
  Delete,
  Param,
  PayloadTooLargeException,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../Auth/Guard/jwt-auth.guard'
import { CardService } from './card.service'
import { CardTitleDto } from './DTO/card-title.dto'
import { CardDescriptionDto } from './DTO/card-description.dto'
import { CardBorderDto } from './DTO/card-border.dto'
import {
  FileUploadService,
  MulterCoverConfig,
  MulterFilesConfig,
} from '../FileUpload/file-upload.service'
import { CardIdDto } from './DTO/card-id.dto'
import { CardDateDto } from './DTO/card-date.dto'
import { CardCompletedDto } from './DTO/card-completed.dto'
import { CardColumnIdDto } from './DTO/card-ColumnID.dto'
import { IResponseMessage, IResponseSuccess } from '../Utils/Types/promise.type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly fileService: FileUploadService,
  ) {}

  @ApiOperation({ summary: 'Create empty card' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createCard(@Body() createDto: CardColumnIdDto): Promise<IResponseSuccess> {
    return this.cardService.createNewCard(createDto)
  }

  @ApiOperation({ summary: 'Set/change title' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/title')
  createTitle(
    @Body() createCardTitleDto: CardTitleDto,
  ): Promise<IResponseMessage> {
    return this.cardService.createTitle(createCardTitleDto)
  }

  @ApiOperation({ summary: 'Set/change description' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/description')
  createDescription(
    @Body() createCardDescriptionDto: CardDescriptionDto,
  ): Promise<IResponseMessage> {
    return this.cardService.createDescription(createCardDescriptionDto)
  }

  @ApiOperation({ summary: 'Set/change border' })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/border')
  createBorderColor(
    @Body() createCardBorderDto: CardBorderDto,
  ): Promise<IResponseMessage> {
    return this.cardService.createBorder(createCardBorderDto)
  }

  @ApiOperation({ summary: 'Upload cover' })
  @UseGuards(JwtAuthGuard)
  @Post('/cover')
  @UseInterceptors(FileInterceptor('cover', MulterCoverConfig))
  async uploadCover(
    @UploadedFile() file: Express.Multer.File,
    @Body() cardIdDto: CardIdDto,
  ): Promise<{ url: string }> {
    await this.cardService.doEmptyCoverField(cardIdDto.card_id)
    const upload = await this.fileService.cloudinaryUpload(file, 'Covers')
    const data = await this.fileService.saveFile(file.originalname, upload)
    return await this.cardService.saveCover(cardIdDto.card_id, data.url)
  }

  @ApiOperation({ summary: 'Upload files' })
  @UseGuards(JwtAuthGuard)
  @Post('/attachments')
  @UseInterceptors(FilesInterceptor('file', 3, MulterFilesConfig))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() cardIdDto: CardIdDto,
  ): Promise<IResponseMessage> {
    const ArrayAttachmentsLength = await this.cardService.attachmentLength(
      cardIdDto.card_id,
    )
    if (
      ArrayAttachmentsLength >= 3 ||
      files.length + ArrayAttachmentsLength > 3
    )
      throw new PayloadTooLargeException('Maximum number of attachments 3')

    const uploadFiles = await Promise.all(
      files.map((file) => this.fileService.cloudinaryUpload(file, 'Files')),
    )
    const savedFiles = await Promise.all(
      uploadFiles.map((file, index) =>
        this.fileService.saveFile(files[index].originalname, file),
      ),
    )
    await this.cardService.findAndAddAttachments(cardIdDto.card_id, savedFiles)
    return { message: 'Files upload success' }
  }

  @ApiOperation({ summary: 'Delete cover' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete('/cover') // id card
  coverRemove(@Body() cardID: CardIdDto): Promise<IResponseMessage> {
    return this.cardService.deleteCover(cardID.card_id)
  }

  @ApiOperation({ summary: 'Delete files' })
  @UseGuards(JwtAuthGuard)
  @Delete('/attachment/:id') // id attachment
  attachmentRemove(@Param('id') id: string): Promise<IResponseMessage> {
    return this.cardService.attachmentDelete(id)
  }

  @ApiOperation({ summary: 'Set/change date' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/date')
  setDateTimer(@Body() setDateDto: CardDateDto): Promise<IResponseSuccess> {
    return this.cardService.setDateTimer(setDateDto)
  }

  @ApiOperation({ summary: 'Make checker active/inactive' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/isCompleted')
  setCompleted(
    @Body() isCompletedDto: CardCompletedDto,
  ): Promise<IResponseSuccess> {
    return this.cardService.changeIsCompleted(isCompletedDto)
  }
}
