import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CardCompletedDto {
  @ApiProperty({ example: '6203f9d991c9f9df098d7478' })
  @IsString()
  @IsNotEmpty()
  readonly card_id: string

  @ApiProperty({ example: 'true', type: 'boolean', default: false })
  @IsBoolean()
  @IsNotEmpty()
  readonly isCompleted: boolean
}
