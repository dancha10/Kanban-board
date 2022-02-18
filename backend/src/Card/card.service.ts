import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Card, CardModelDocument } from '../Models/card.model'
import { ColumnService } from '../Column/column.service'
import { FileUploadService } from '../FileUpload/file-upload.service'
import { CardTitleDto } from './DTO/card-title.dto'
import { CardDescriptionDto } from './DTO/card-description.dto'
import { CardBorderDto } from './DTO/card-border.dto'
import { CardDateDto } from './DTO/card-date.dto'
import { CardCompletedDto } from './DTO/card-completed.dto'
import { CardColumnIdDto } from './DTO/card-ColumnID.dto'
import { File } from '../Models/file.model'

import { IResponseMessage, IResponseSuccess } from '../Utils/Types/promise.type'

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private CardModel: Model<CardModelDocument>,
    private readonly fileUploadService: FileUploadService,
    @Inject(forwardRef(() => ColumnService))
    private readonly columnService: ColumnService,
  ) {}

  async createNewCard(createDto: CardColumnIdDto): Promise<IResponseSuccess> {
    const card = await this.CardModel.create({})
    if (!card) throw new BadRequestException("Card didn't created")
    const result = await this.columnService.addCardInColumn(createDto.CID, card)
    if (!result) throw new NotFoundException('Column not founded')
    return { success: true }
  }

  async createTitle(
    createCardTitleDto: CardTitleDto,
  ): Promise<IResponseMessage> {
    const card = await this.CardModel.findByIdAndUpdate(
      { _id: createCardTitleDto.card_id },
      { title: createCardTitleDto.title },
    )
    if (!card)
      throw new HttpException(
        'The required board does not exist',
        HttpStatus.NOT_FOUND,
      )
    return { message: 'Title saved' }
  }

  async createDescription(
    createCardDescription: CardDescriptionDto,
  ): Promise<IResponseMessage> {
    const card = await this.CardModel.findByIdAndUpdate(
      {
        _id: createCardDescription.card_id,
      },
      { description: createCardDescription.description },
    )
    if (!card)
      throw new HttpException(
        'The required board does not exist',
        HttpStatus.NOT_FOUND,
      )
    return { message: 'Description saved' }
  }

  async createBorder(
    createCardBorderColor: CardBorderDto,
  ): Promise<IResponseMessage> {
    const card = await this.CardModel.findByIdAndUpdate(
      {
        _id: createCardBorderColor.card_id,
      },
      { borderColor: createCardBorderColor.borderColor },
    )
    if (!card)
      throw new HttpException(
        'The required board does not exist',
        HttpStatus.NOT_FOUND,
      )
    return { message: 'Color saved' }
  }

  async saveCover(id: string, url: string): Promise<{ url: string }> {
    const card = await this.CardModel.findByIdAndUpdate(
      { _id: id },
      { coverURL: url },
    )
    const URL = card.coverURL
    return { url: URL }
  }

  async attachmentLength(id: string): Promise<number> {
    const attachmentArray = await this.CardModel.findById({ _id: id })
    return attachmentArray.attachment.length
  }

  async findAndAddAttachments(
    id: string,
    attachments: Array<any>,
  ): Promise<Card> {
    return this.CardModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          attachment: [...attachments],
        },
      },
    )
  }

  async doEmptyCoverField(id: string): Promise<boolean | File> {
    const card = await this.CardModel.findById({ _id: id })
    const coverField: string | undefined = await card.coverURL
    if (coverField || coverField !== '')
      return this.fileUploadService.removeFile(coverField)
    return true
  }

  async deleteCover(id: string): Promise<IResponseMessage> {
    const card = await this.CardModel.findByIdAndUpdate(
      { _id: id },
      { coverURL: '' },
    )
    await this.fileUploadService.removeFile(card.coverURL)
    return { message: 'Cover deleted' }
  }

  async attachmentDelete(id: string): Promise<IResponseMessage> {
    await this.CardModel.findOneAndUpdate(
      {
        attachment: { $elemMatch: { $in: id } },
      },
      { $pull: { attachment: id } },
    )

    await this.fileUploadService.deleteAttachmentById(id)
    return { message: 'Attachment deleted' }
  }

  async setDateTimer(setDateDto: CardDateDto): Promise<IResponseSuccess> {
    await this.CardModel.findByIdAndUpdate(
      { _id: setDateDto.card_id },
      {
        $set: {
          'time.start': setDateDto.start,
          'time.end': setDateDto.end,
        },
      },
    )
    return { success: true }
  }

  async changeIsCompleted(
    isCompletedDto: CardCompletedDto,
  ): Promise<IResponseSuccess> {
    await this.CardModel.findByIdAndUpdate(
      { _id: isCompletedDto.card_id },
      { 'time.isCompleted': isCompletedDto.isCompleted },
    )
    return { success: true }
  }

  // other

  async createStartCard(title: string): Promise<Card> {
    return await this.CardModel.create({ title: title })
  }
}
