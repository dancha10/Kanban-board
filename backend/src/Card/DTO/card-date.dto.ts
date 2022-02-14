import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CardDateDto {
  @ApiProperty({ example: '6203f9d991c9f9df098d7478' })
  @IsString()
  @IsNotEmpty()
  readonly card_id: string

  @ApiProperty({ example: '1644682529047', format: 'new Date().ofValue()' })
  readonly start: number | null

  @ApiProperty({ example: '1744682529048', format: 'new Date().ofValue()' })
  readonly end: number | null
}
