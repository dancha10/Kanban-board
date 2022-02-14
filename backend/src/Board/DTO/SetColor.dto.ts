import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SetColorDto {
  @ApiProperty({ example: 'red' })
  @IsNotEmpty()
  readonly background: string
}
