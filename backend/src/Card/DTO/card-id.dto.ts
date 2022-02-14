import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CardIdDto {
  @ApiProperty({ example: '6203f9d991c9f9df098d7478' })
  @IsNotEmpty()
  readonly card_id: string
}
