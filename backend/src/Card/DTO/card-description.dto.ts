import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CardDescriptionDto {
  @ApiProperty({ example: '6203f9d991c9f9df098d7478' })
  @IsNotEmpty()
  readonly card_id: string

  @ApiProperty({ example: 'Smash with a hammer on a dark night' })
  @IsString()
  @MaxLength(40)
  readonly description: string
}
